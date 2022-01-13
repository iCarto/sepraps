from monitoring.models.domain_entry import dominio_get_value
from monitoring.models.project import Project, get_code_for_new_project
from monitoring.serializers.contact_serlializer import ContactSerializer
from monitoring.serializers.infraestructure_serializer import InfraestructureSerializer
from monitoring.serializers.locality_serializer import LocalitySerializer
from monitoring.serializers.provider_serializer import ProviderSerializer
from rest_framework import serializers


class ProjectSerializer(serializers.ModelSerializer):
    featured_image = serializers.SerializerMethodField()
    phase_name = serializers.SerializerMethodField()
    project_type_name = serializers.SerializerMethodField()
    project_class_name = serializers.SerializerMethodField()
    financing_fund_name = serializers.CharField(source="financing_fund.name")
    financing_program_name = serializers.CharField(source="financing_program.name")
    main_infrastructure = InfraestructureSerializer()
    linked_localities = LocalitySerializer(many=True)
    provider = ProviderSerializer()
    contacts = ContactSerializer(many=True)
    creation_user = serializers.CharField(source="creation_user.username")

    class Meta:
        model = Project
        fields = (
            "id",
            "name",
            "code",
            "featured_image",
            "phase_name",
            "project_type_name",
            "project_class_name",
            "init_date",
            "main_infrastructure",
            "linked_localities",
            "provider",
            "financing_fund_name",
            "financing_program_name",
            "contacts",
            "creation_user",
            "created_at",
            "updated_at",
        )
        read_only_fields = ["creation_user", "created_at"]

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            fields[field].read_only = True
        return fields

    # ATTRIBUTES

    # Fake attribute
    def get_featured_image(self, obj):
        images = [
            "https://cdn.pixabay.com/photo/2017/04/22/16/00/water-resources-2251633_1280.jpg",
            "https://images.unsplash.com/photo-1585318822320-300abf39f65d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXJlZ3VhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1538300342682-cf57afb97285?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2574&q=80",
            "https://cdn.pixabay.com/photo/2013/09/21/18/36/river-184611__340.jpg",
            "https://cdn.pixabay.com/photo/2016/11/13/14/24/pipe-1821109__480.jpg",
        ]
        return images[obj.id % 5]

    # Fake attribute
    def get_phase_name(self, obj):
        phases = ["Diseño", "Ejecución", "Post-Construcción"]
        return phases[obj.id % 3]

    def get_project_type_name(self, obj):
        return dominio_get_value(obj.project_type)

    def get_project_class_name(self, obj):
        return dominio_get_value(obj.project_class)

    # OPERATIONS

    def create(self, validated_data):

        validated_data["code"] = get_code_for_new_project()

        project = Project.objects.create(**validated_data)
        return project


class ProjectSummarySerializer(ProjectSerializer):
    department_name = serializers.CharField(
        source="main_infrastructure.department.name"
    )
    district_name = serializers.CharField(source="main_infrastructure.district.name")
    locality_name = serializers.CharField(source="main_infrastructure.locality.name")
    provider_name = serializers.CharField(source="provider.name", allow_null=True)

    class Meta(ProjectSerializer.Meta):
        fields = (
            "id",
            "name",
            "code",
            "featured_image",
            "department_name",
            "district_name",
            "locality_name",
            "phase_name",
            "project_type_name",
            "project_class_name",
            "init_date",
            "provider_name",
            "financing_fund_name",
            "financing_program_name",
            "created_at",
            "updated_at",
        )
