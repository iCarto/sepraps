from django.db.models import Prefetch
from rest_framework import serializers
from rest_framework_gis.fields import GeometryField
from rest_framework_gis.serializers import GeoFeatureModelSerializer

from app.models.building_component_monitoring import BuildingComponentMonitoring

# from django.db.models import F, Prefetch
from app.models.infrastructure import Infrastructure
from app.models.milestone import Milestone
from app.models.project import Project, get_code_for_new_project
from app.models.provider import Provider
from app.serializers.construction_contract_serializer import (
    ConstructionContractSummarySerializer,
)
from app.serializers.infrastructure_serializer import InfrastructureSerializer
from app.serializers.locality_serializer import LocalitySerializer
from app.serializers.milestone_serializer import MilestoneSummarySerializer
from app.serializers.project_work_serializer import ProjectWorkSerializer
from app.serializers.provider_serializer import ProviderSerializer
from app.util import format_decimal
from documents.serializers import MediaUrlSerializer


class ProjectSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Project
        fields = (
            "id",
            "code",
            "closed",
            "project_works",
            "description",
            "init_date",
            "featured_image",
            "linked_localities",
            "main_infrastructure",
            "provider",
            "construction_contract",
            "milestones",
            "folder",
            "related_contracts",
            "creation_user",
            "created_at",
            "updated_at",
            "financial_progress_percentage",
            "physical_progress_percentage",
            "bm_total_expected_amount",
            "number_of_bcomponents",
        )

    code = serializers.CharField(required=False, read_only=True)
    closed = serializers.BooleanField(required=False)
    main_infrastructure = InfrastructureSerializer()
    linked_localities = LocalitySerializer(many=True)
    project_works = ProjectWorkSerializer(many=True)
    provider = ProviderSerializer(required=False, allow_null=True)
    construction_contract = ConstructionContractSummarySerializer(read_only=True)
    milestones = serializers.SerializerMethodField(required=False, read_only=True)
    creation_user = serializers.CharField(
        source="creation_user.username", required=False
    )
    folder = serializers.SerializerMethodField()
    related_contracts = ConstructionContractSummarySerializer(
        source="related_contracts_list", many=True, read_only=True
    )
    financial_progress_percentage = serializers.SerializerMethodField(
        required=False, read_only=True
    )
    physical_progress_percentage = serializers.SerializerMethodField(
        required=False, read_only=True
    )
    number_of_bcomponents = serializers.SerializerMethodField()

    def setup_eager_loading(queryset):
        """Perform necessary eager loading of data."""
        return queryset.select_related(
            "main_infrastructure",
            "main_infrastructure__locality",
            "main_infrastructure__locality__department",
            "main_infrastructure__locality__district",
            "provider",
            "progress",
        ).prefetch_related(
            "project_works",
            "linked_localities",
            Prefetch(
                "provider__contacts"
                # TODO this is not working: multiple queries are executed
                # https://stackoverflow.com/questions/35093204/django-prefetch-related-with-m2m-through-relationship
                # queryset=ProviderContact.objects.prefetch_related("contact"),
                # To make this working we need a "provider" attribute in ProviderContact and not "entity"
            ),
            Prefetch(
                "milestones",
                queryset=Milestone.objects.exclude(parent__isnull=False).order_by(
                    "ordering"
                ),
            ),
            "project_building_monitorings",
        )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if "featured_image" in response:
            response["featured_image"] = (
                MediaUrlSerializer(instance.featured_image, context=self.context).data[
                    "url"
                ]
                if instance.featured_image is not None
                else None
            )
        return response

    # ATTRIBUTES

    def get_folder(self, obj):
        return obj.folder.media_path if obj.folder else None

    def get_milestones(self, obj):
        return MilestoneSummarySerializer(
            obj.milestones.exclude(parent__isnull=False).order_by("ordering"), many=True
        ).data

    def get_financial_progress_percentage(self, obj):
        return (
            format_decimal(obj.progress.financial_progress_percentage)
            if obj.progress.financial_progress_percentage
            else None
        )

    def get_physical_progress_percentage(self, obj):
        return (
            format_decimal(obj.progress.physical_progress_percentage)
            if obj.progress.physical_progress_percentage
            else None
        )

    def get_number_of_bcomponents(self, obj):
        return obj.project_building_monitorings.count()

    # OPERATIONS

    def create(self, validated_data):
        validated_data["code"] = get_code_for_new_project()

        main_infrastructure_data = validated_data.pop("main_infrastructure")
        infrastructure = Infrastructure.objects.create(**main_infrastructure_data)

        provider_data = validated_data.pop("provider", None)
        provider = None
        if provider_data:
            if provider_data.get("id"):
                provider = Provider.objects.get(pk=provider_data["id"])
                self.fields["provider"].update(provider, provider_data)
            else:
                provider = self.fields["provider"].create(provider_data)

        project_works_data = validated_data.pop("project_works")
        linked_localities_data = validated_data.pop("linked_localities")

        project = Project.objects.create(
            main_infrastructure=infrastructure, provider=provider, **validated_data
        )

        project.linked_localities.set(
            self.fields["linked_localities"].update([], linked_localities_data)
        )

        project_works = self.fields["project_works"].create(
            [{"project": project, **pw_data} for pw_data in project_works_data]
        )
        project.project_works.set(project_works)

        return project

    def update_main_infrastructure(self, instance, validated_data):
        main_infrastructure_data = validated_data.pop("main_infrastructure", None)

        if main_infrastructure_data:
            main_infrastructure = instance.main_infrastructure
            for key in main_infrastructure_data.keys():
                setattr(
                    main_infrastructure,
                    key,
                    main_infrastructure_data.get(
                        key, getattr(main_infrastructure, key)
                    ),
                )

            main_infrastructure.save()
            instance.main_infrastructure = main_infrastructure

    def update_provider(self, instance, validated_data):
        # Two different ways
        # - provider field doesn't exists in validated_data -> is a partial update
        # - provider = null -> remove provider from project
        if "provider" in validated_data:
            provider_data = validated_data.pop("provider", None)

            provider = None
            if provider_data:
                if "id" in provider_data and provider_data["id"] is not None:
                    provider = Provider.objects.get(pk=provider_data["id"])
                    self.fields["provider"].update(provider, provider_data)
                else:
                    provider = self.fields["provider"].create(provider_data)

            instance.provider = provider

    def update_linked_localities(self, instance, validated_data):
        instance.linked_localities.set(
            self.fields["linked_localities"].update(
                instance.linked_localities.all(),
                validated_data.pop("linked_localities", None),
            )
        )

    def update_project_works(self, instance, validated_data):
        # TODO(egago): Improve the performance and quality of this method
        # Remove and create for a current set
        if "project_works" in validated_data:
            project_works_data = validated_data.pop("project_works", None)
            project_works_to_delete = []
            current_project_works = instance.project_works.all()
            for project_work in current_project_works:
                found = False
                for project_work_data in project_works_data:
                    if (
                        project_work_data.get("work_type") == project_work.work_type
                        and project_work_data.get("work_class")
                        == project_work.work_class
                    ):
                        found = True
                if not found:
                    project_works_to_delete.append(project_work)

            project_works_to_create = []
            for project_work_data in project_works_data:
                found = False
                for project_work in current_project_works:
                    if (
                        project_work_data.get("work_type") == project_work.work_type
                        and project_work_data.get("work_class")
                        == project_work.work_class
                    ):
                        found = True
                if not found:
                    project_works_to_create.append(project_work_data)

            self.fields["project_works"].create(
                [
                    {"project": instance, **pw_data}
                    for pw_data in project_works_to_create
                ]
            )
            for project_work in project_works_to_delete:
                project_work.delete()

    def update_featured_image(self, instance, validated_data):
        if "featured_image" in validated_data:
            featured_image_data = validated_data.pop("featured_image", None)
            instance.featured_image = featured_image_data

    def update(self, instance, validated_data):
        self.update_main_infrastructure(instance, validated_data)
        self.update_provider(instance, validated_data)
        self.update_linked_localities(instance, validated_data)
        self.update_project_works(instance, validated_data)
        self.update_featured_image(instance, validated_data)

        # nested entities properties were removed in previous methods
        for key in validated_data.keys():
            setattr(instance, key, validated_data.get(key, getattr(instance, key)))

        instance.save()
        return instance


class ProjectSummarySerializer(serializers.ModelSerializer):
    class Meta(ProjectSerializer.Meta):
        fields = (
            "id",
            "code",
            "name",
            "closed",
            "project_works",
            "description",
            "init_date",
            "featured_image",
            "linked_localities",
            "provider",
            "provider_name",
            "construction_contract_number",
            "construction_contract_bid_request_number",
            "financing_program",
            "financing_program_name",
            "latitude",
            "longitude",
            "created_at",
            "updated_at",
            "financial_progress_percentage",
            "physical_progress_percentage",
            "number_of_bcomponents",
        )

    name = serializers.SerializerMethodField()
    closed = serializers.BooleanField()
    linked_localities = LocalitySerializer(many=True)
    provider_name = serializers.CharField(source="provider.name", default=None)
    construction_contract_number = serializers.CharField(
        source="construction_contract.number", default=None
    )
    construction_contract_bid_request_number = serializers.CharField(
        source="construction_contract.bid_request_number", default=None
    )
    financing_program = serializers.IntegerField(
        source="construction_contract.financing_program.id", required=False
    )
    financing_program_name = serializers.CharField(
        source="construction_contract.financing_program.short_name", required=False
    )
    latitude = serializers.CharField(
        source="main_infrastructure.latitude", default=None
    )
    longitude = serializers.CharField(
        source="main_infrastructure.longitude", default=None
    )
    financial_progress_percentage = serializers.SerializerMethodField(
        required=False, read_only=True
    )
    physical_progress_percentage = serializers.SerializerMethodField(
        required=False, read_only=True
    )
    number_of_bcomponents = serializers.SerializerMethodField()

    def get_financial_progress_percentage(self, obj):
        return (
            format_decimal(obj.progress.financial_progress_percentage)
            if obj.progress.financial_progress_percentage
            else None
        )

    project_works = ProjectWorkSerializer(many=True)

    def get_physical_progress_percentage(self, obj):
        return (
            format_decimal(obj.progress.physical_progress_percentage)
            if obj.progress.physical_progress_percentage
            else None
        )

    def get_number_of_bcomponents(self, obj):
        return obj.project_building_monitorings.count()

    def get_name(self, obj):
        return " - ".join(i.name for i in obj.linked_localities.all())

    def setup_eager_loading(self):
        """Perform necessary eager loading of data."""
        return self.select_related(
            "main_infrastructure", "provider", "featured_image", "progress"
        ).prefetch_related(
            "linked_localities",
            "project_works",
            Prefetch(
                "project_building_monitorings",
                queryset=BuildingComponentMonitoring.objects.select_related(),
            ),
        )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if "featured_image" in response:
            response["featured_image"] = (
                MediaUrlSerializer(instance.featured_image, context=self.context).data[
                    "url"
                ]
                if instance.featured_image is not None
                else None
            )
        return response

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            if field != "id":
                fields[field].read_only = True
        return fields


class ProjectShortSerializer(ProjectSerializer):
    class Meta(ProjectSerializer.Meta):
        fields = ("id", "code", "closed", "linked_localities")


class ProjectGeoSerializer(GeoFeatureModelSerializer):
    class Meta(object):
        model = Project
        geo_field = "location"
        fields = ("id", "code", "closed", "name", "project_works", "location", "status")

    name = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    location = GeometryField()
    project_works = ProjectWorkSerializer(many=True)

    def setup_eager_loading(queryset):
        """Perform necessary eager loading of data."""
        return queryset.select_related("main_infrastructure").prefetch_related(
            "linked_localities",
            Prefetch(
                "milestones",
                queryset=Milestone.objects.exclude(parent__isnull=False)
                .exclude(compliance_date__isnull=True)
                .order_by("-ordering"),
            ),
        )

    def get_name(self, obj):
        return " - ".join(i.name for i in obj.linked_localities.all())

    def get_status(self, obj):
        last_milestone = obj.milestones.first()
        return last_milestone.phase if last_milestone else None
