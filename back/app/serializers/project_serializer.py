from django.db.models import Prefetch
from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices
from rest_framework import serializers

# from django.db.models import F, Prefetch
from app.models.construction_contract import ConstructionContract
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
from app.serializers.provider_serializer import ProviderSerializer
from documents.serializers import MediaUrlSerializer
from questionnaires.serializers.questionnaire_serializer import (
    QuestionnaireShortSerializer,
)


class ProjectSerializer(BaseDomainMixin, serializers.ModelSerializer):
    code = serializers.CharField(required=False, read_only=True)
    closed = serializers.BooleanField(required=False)
    main_infrastructure = InfrastructureSerializer()
    linked_localities = LocalitySerializer(many=True)
    provider = ProviderSerializer(required=False, allow_null=True)
    construction_contract = serializers.PrimaryKeyRelatedField(
        required=False, allow_null=True, queryset=ConstructionContract.objects.all()
    )
    milestones = serializers.SerializerMethodField(required=False, read_only=True)
    creation_user = serializers.CharField(
        source="creation_user.username", required=False
    )
    folder = serializers.SerializerMethodField()
    questionnaires = QuestionnaireShortSerializer(many=True, read_only=True)

    class Meta(object):
        model = Project
        fields = (
            "id",
            "code",
            "closed",
            "project_type",
            "project_class",
            "description",
            "init_date",
            "featured_image",
            "linked_localities",
            "main_infrastructure",
            "provider",
            "construction_contract",
            "milestones",
            "folder",
            "questionnaires",
            "creation_user",
            "created_at",
            "updated_at",
        )

    def setup_eager_loading(queryset):
        """Perform necessary eager loading of data."""
        return queryset.select_related(
            "main_infrastructure",
            "main_infrastructure__locality",
            "main_infrastructure__locality__department",
            "main_infrastructure__locality__district",
            "provider",
            "construction_contract",
            "construction_contract__financing_program",
            "construction_contract__contractor",
        ).prefetch_related(
            "linked_localities",
            Prefetch(
                "provider__contacts",
                # TODO this is not working: multiple queries are executed
                # https://stackoverflow.com/questions/35093204/django-prefetch-related-with-m2m-through-relationship
                # queryset=ProviderContact.objects.prefetch_related("contact"),
                # To make this working we need a "provider" attribute in ProviderContact and not "entity"
            ),
            "construction_contract__financing_program__financing_funds",
            "construction_contract__contractor__contacts",
            Prefetch(
                "milestones",
                queryset=Milestone.objects.exclude(parent__isnull=False).order_by(
                    "ordering"
                ),
            ),
        )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if "construction_contract" in response:
            response["construction_contract"] = (
                ConstructionContractSummarySerializer(
                    instance.construction_contract, context=self.context
                ).data
                if instance.construction_contract is not None
                else None
            )
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

    domain_fields = [
        BaseDomainField("project_type", DomainCategoryChoices.project_type),
        BaseDomainField("project_class", DomainCategoryChoices.project_class),
    ]

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

        linked_localities_data = validated_data.pop("linked_localities")

        project = Project.objects.create(
            main_infrastructure=infrastructure, provider=provider, **validated_data
        )

        project.linked_localities.set(
            self.fields["linked_localities"].update([], linked_localities_data)
        )

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

    def update_featured_image(self, instance, validated_data):
        if "featured_image" in validated_data:
            featured_image_data = validated_data.pop("featured_image", None)
            instance.featured_image = featured_image_data

    def update(self, instance, validated_data):
        self.update_main_infrastructure(instance, validated_data)
        self.update_provider(instance, validated_data)
        self.update_linked_localities(instance, validated_data)
        self.update_featured_image(instance, validated_data)

        # nested entities properties were removed in previous methods
        for key in validated_data.keys():
            setattr(instance, key, validated_data.get(key, getattr(instance, key)))

        instance.save()
        return instance


class ProjectSummarySerializer(BaseDomainMixin, serializers.ModelSerializer):
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
    milestones = serializers.SerializerMethodField()
    latitude = serializers.CharField(
        source="main_infrastructure.latitude", default=None
    )
    longitude = serializers.CharField(
        source="main_infrastructure.longitude", default=None
    )

    class Meta(ProjectSerializer.Meta):
        fields = (
            "id",
            "code",
            "closed",
            "project_type",
            "project_class",
            "description",
            "init_date",
            "featured_image",
            "linked_localities",
            "provider",
            "provider_name",
            "construction_contract",
            "construction_contract_number",
            "construction_contract_bid_request_number",
            "financing_program",
            "financing_program_name",
            "milestones",
            "latitude",
            "longitude",
            "created_at",
            "updated_at",
        )

    def setup_eager_loading(queryset):
        """Perform necessary eager loading of data."""
        return queryset.select_related(
            "main_infrastructure",
            "provider",
            "construction_contract",
            "construction_contract__financing_program",
            "featured_image",
        ).prefetch_related(
            "linked_localities",
            Prefetch(
                "milestones",
                queryset=Milestone.objects.exclude(parent__isnull=False).order_by(
                    "ordering"
                ),
            ),
            "questionnaires",
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

    domain_fields = [
        BaseDomainField("project_type", DomainCategoryChoices.project_type),
        BaseDomainField("project_class", DomainCategoryChoices.project_class),
    ]

    def get_milestones(self, obj):
        return MilestoneSummarySerializer(obj.milestones, many=True).data


class ProjectShortSerializer(ProjectSerializer):
    class Meta(ProjectSerializer.Meta):
        fields = ("id", "code", "closed", "linked_localities")
