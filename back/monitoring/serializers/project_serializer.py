from django.db.models import F
from monitoring.models.construction_contract import ConstructionContract
from monitoring.models.domain_entry import dominio_get_value
from monitoring.models.infrastructure import Infrastructure
from monitoring.models.location import Locality
from monitoring.models.project import Project, get_code_for_new_project
from monitoring.models.provider import Provider
from monitoring.serializers.construction_contract_serializer import (
    ConstructionContractSummarySerializer,
)
from monitoring.serializers.infraestructure_serializer import InfraestructureSerializer
from monitoring.serializers.locality_serializer import LocalitySerializer
from monitoring.serializers.milestone_serializer import (
    MilestoneSerializer,
    MilestoneSummarySerializer,
)
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
            "name",
            "code",
            "project_type",
            "project_type_name",
            "project_class",
            "project_class_name",
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

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if "linked_localities" in response:
            response["linked_localities"] = LocalitySerializer(
                instance.linked_localities, many=True
            ).data
        if "construction_contract" in response:
            response["construction_contract"] = (
                ConstructionContractSummarySerializer(
                    instance.construction_contract
                ).data
                if instance.construction_contract is not None
                else None
            )
        return response

    # ATTRIBUTES

    def get_project_type_name(self, obj):
        return dominio_get_value(obj.project_type)

    def get_project_class_name(self, obj):
        return dominio_get_value(obj.project_class)

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


class ProjectSummarySerializer(ProjectSerializer):
    provider_name = serializers.CharField(source="provider.name", allow_null=True)

    class Meta(ProjectSerializer.Meta):
        fields = (
            "id",
            "name",
            "code",
            "locality",
            "project_type",
            "project_class",
            "init_date",
            "main_infrastructure",
            "provider_name",
            "financing_fund_name",
            "financing_program_name",
            "milestones",
            "created_at",
            "updated_at",
        )

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            if field != "id":
                fields[field].read_only = True
        return fields


class ProjectShortSerializer(ProjectSerializer):
    class Meta(ProjectSerializer.Meta):
        fields = ("id", "name", "code")
