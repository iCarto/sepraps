from django.db.models import F, Prefetch
from monitoring.models.construction_contract import ConstructionContract
from monitoring.models.domain_entry import dominio_get_value
from monitoring.models.infrastructure import Infrastructure
from monitoring.models.location import Locality
from monitoring.models.milestone import Milestone
from monitoring.models.project import Project, get_code_for_new_project
from monitoring.models.provider import Provider
from monitoring.serializers.construction_contract_serializer import (
    ConstructionContractSummarySerializer,
)
from monitoring.serializers.infraestructure_serializer import InfraestructureSerializer
from monitoring.serializers.locality_serializer import LocalitySerializer
from monitoring.serializers.milestone_serializer import MilestoneSummarySerializer
from monitoring.serializers.provider_serializer import ProviderSerializer
from rest_framework import serializers


class ProjectSerializer(serializers.ModelSerializer):
    code = serializers.CharField(required=False, read_only=True)
    project_type_name = serializers.SerializerMethodField(required=False)
    project_class_name = serializers.SerializerMethodField(required=False)
    financing_fund_name = serializers.CharField(
        source="financing_fund.name", required=False, read_only=True
    )
    financing_program_name = serializers.CharField(
        source="financing_program.name", required=False, read_only=True
    )
    main_infrastructure = InfraestructureSerializer()
    locality = LocalitySerializer(source="main_infrastructure.locality", read_only=True)
    linked_localities = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Locality.objects.prefetch_related("department", "district")
    )
    provider = ProviderSerializer(required=False, allow_null=True)
    construction_contract = serializers.PrimaryKeyRelatedField(
        required=False, allow_null=True, queryset=ConstructionContract.objects.all()
    )
    milestones = serializers.SerializerMethodField(required=False, read_only=True)
    creation_user = serializers.CharField(
        source="creation_user.username", required=False
    )
    folder = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = (
            "id",
            "code",
            "project_type",
            "project_type_name",
            "project_class",
            "project_class_name",
            "description",
            "init_date",
            "main_infrastructure",
            "locality",
            "linked_localities",
            "provider",
            "financing_fund",
            "financing_fund_name",
            "financing_program",
            "financing_program_name",
            "construction_contract",
            "milestones",
            "folder",
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
            "provider__locality",
            "provider__locality__department",
            "provider__locality__district",
            "construction_contract",
            "construction_contract__contractor",
            "financing_fund",
            "financing_program",
        ).prefetch_related(
            "linked_localities",
            "provider__contacts",
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
        if "linked_localities" in response:
            response["linked_localities"] = LocalitySerializer(
                instance.linked_localities, many=True
            ).data
        if "construction_contract" in response:
            response["construction_contract"] = (
                ConstructionContractSummarySerializer(
                    instance.construction_contract, context=self.context
                ).data
                if instance.construction_contract is not None
                else None
            )
        return response

    # ATTRIBUTES

    def get_project_type_name(self, obj):
        return dominio_get_value(obj.project_type, self.context["domain"])

    def get_project_class_name(self, obj):
        return dominio_get_value(obj.project_class, self.context["domain"])

    def get_folder(self, obj):
        return obj.folder.media_path

    def get_milestones(self, obj):
        return MilestoneSummarySerializer(
            obj.milestones.exclude(parent__isnull=False).order_by("ordering"), many=True
        ).data

    # OPERATIONS

    def create(self, validated_data):

        validated_data["code"] = get_code_for_new_project()

        main_infrastructure_data = validated_data.pop("main_infrastructure")
        infrastructure = Infrastructure.objects.create(**main_infrastructure_data)

        provider_data = validated_data.pop("provider", None)
        provider = None
        if provider_data:
            provider, _ = Provider.objects.get_or_create(**provider_data)

        linked_localities = validated_data.pop("linked_localities")

        project = Project.objects.create(
            main_infrastructure=infrastructure, provider=provider, **validated_data
        )
        project.linked_localities.set(linked_localities)

        return project

    def update_main_infrastructure(self, instance, validated_data):
        main_infrastructure_data = validated_data.pop("main_infrastructure")

        main_infrastructure = instance.main_infrastructure
        for key in main_infrastructure_data.keys():
            setattr(
                main_infrastructure,
                key,
                main_infrastructure_data.get(key, getattr(main_infrastructure, key)),
            )

        main_infrastructure.save()
        instance.main_infrastructure = main_infrastructure

    def update_provider(self, instance, validated_data):
        provider_data = validated_data.pop("provider")

        provider = None
        if provider_data:

            if "id" in provider_data and provider_data["id"] is not None:
                provider = Provider.objects.get(pk=provider_data["id"])
                self.fields["provider"].update(provider, provider_data)
            else:
                provider = self.fields["provider"].create(provider_data)

        instance.provider = provider

    def update_linked_localities(self, instance, validated_data):
        linked_localities = validated_data.pop("linked_localities")
        instance.linked_localities.set(linked_localities)

    def update(self, instance, validated_data):

        self.update_main_infrastructure(instance, validated_data)
        self.update_provider(instance, validated_data)
        self.update_linked_localities(instance, validated_data)

        # nested entities properties were removed in previous methods
        for key in validated_data.keys():
            setattr(instance, key, validated_data.get(key, getattr(instance, key)))

        instance.save()
        return instance


class ProjectSummarySerializer(serializers.ModelSerializer):

    project_type_name = serializers.SerializerMethodField()
    project_class_name = serializers.SerializerMethodField()
    provider_name = serializers.CharField(source="provider.name", default=None)
    construction_contract_number = serializers.CharField(
        source="construction_contract.number", default=None
    )
    construction_contract_bid_request_number = serializers.CharField(
        source="construction_contract.bid_request_number", default=None
    )
    financing_fund_name = serializers.CharField(
        source="financing_fund.short_name", default=None
    )
    financing_program_name = serializers.CharField(
        source="financing_program.short_name", default=None
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
            "project_type",
            "project_type_name",
            "project_class",
            "project_class_name",
            "description",
            "init_date",
            "linked_localities",
            "provider",
            "provider_name",
            "construction_contract",
            "construction_contract_number",
            "construction_contract_bid_request_number",
            "financing_fund",
            "financing_fund_name",
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
            "financing_fund",
            "financing_program",
            "construction_contract",
        ).prefetch_related(
            "linked_localities",
            Prefetch(
                "milestones",
                queryset=Milestone.objects.exclude(parent__isnull=False).order_by(
                    "ordering"
                ),
            ),
        )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if "linked_localities" in response:
            response["linked_localities"] = LocalitySerializer(
                instance.linked_localities, many=True
            ).data
        return response

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            if field != "id":
                fields[field].read_only = True
        return fields

    def get_project_type_name(self, obj):
        return dominio_get_value(obj.project_type, self.context.get("domain"))

    def get_project_class_name(self, obj):
        return dominio_get_value(obj.project_class, self.context.get("domain"))

    def get_milestones(self, obj):
        return MilestoneSummarySerializer(obj.milestones, many=True).data
