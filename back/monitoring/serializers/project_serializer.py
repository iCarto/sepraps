from monitoring.models.contact import Contact
from monitoring.models.domain_entry import dominio_get_value
from monitoring.models.infrastructure import Infrastructure
from monitoring.models.location import Locality
from monitoring.models.project import Project, get_code_for_new_project
from monitoring.models.provider import Provider
from monitoring.serializers.contact_serializer import ContactSerializer
from monitoring.serializers.infraestructure_serializer import InfraestructureSerializer
from monitoring.serializers.locality_serializer import LocalitySerializer
from monitoring.serializers.provider_serializer import ProviderSerializer
from rest_framework import serializers


class ProjectSerializer(serializers.ModelSerializer):
    code = serializers.CharField(required=False)
    featured_image = serializers.SerializerMethodField()
    phase_name = serializers.SerializerMethodField(required=False)
    project_type_name = serializers.SerializerMethodField(required=False)
    project_class_name = serializers.SerializerMethodField(required=False)
    financing_fund_name = serializers.CharField(
        source="financing_fund.name", required=False
    )
    financing_program_name = serializers.CharField(
        source="financing_program.name", required=False
    )
    main_infrastructure = InfraestructureSerializer()
    linked_localities = LocalitySerializer(many=True)
    provider = ProviderSerializer(required=False, allow_null=True)
    contacts = ContactSerializer(many=True, required=False)
    creation_user = serializers.CharField(
        source="creation_user.username", required=False
    )

    class Meta:
        model = Project
        fields = (
            "id",
            "name",
            "code",
            "featured_image",
            "phase_name",
            "project_type",
            "project_type_name",
            "project_class",
            "project_class_name",
            "init_date",
            "main_infrastructure",
            "linked_localities",
            "provider",
            "financing_fund",
            "financing_fund_name",
            "financing_program",
            "financing_program_name",
            "contacts",
            "creation_user",
            "created_at",
            "updated_at",
        )

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

        main_infrastructure_data = validated_data.pop("main_infrastructure")

        main_inf_locality_data = main_infrastructure_data.pop("locality")
        main_inf_locality = Locality.objects.get(pk=main_inf_locality_data["code"])

        infrastructure = Infrastructure.objects.create(
            **main_infrastructure_data, locality=main_inf_locality
        )

        provider_data = validated_data.pop("provider")

        provider_locality_data = provider_data.pop("locality")
        provider_locality = Locality.objects.get(pk=provider_locality_data["code"])

        provider, _ = Provider.objects.get_or_create(
            **provider_data, locality=provider_locality
        )

        linked_localities_data = validated_data.pop("linked_localities")
        linked_localities_for_project = []
        for linked_locality_data in linked_localities_data:
            for value in linked_locality_data.values():
                linked_localities_for_project.append(value)

        contacts_data = validated_data.pop("contacts")
        contacts_for_project = []
        for contact_data in contacts_data:
            contact, _ = Contact.objects.get_or_create(**contact_data)
            contacts_for_project.append(contact)

        project = Project.objects.create(
            main_infrastructure=infrastructure, provider=provider, **validated_data
        )
        project.linked_localities.set(linked_localities_for_project)
        project.contacts.set(contacts_for_project)

        return project

    def update_main_infrastructure(self, instance, validated_data):
        main_infrastructure_data = validated_data.pop("main_infrastructure")

        main_inf_locality_data = main_infrastructure_data.pop("locality")
        main_inf_locality = Locality.objects.get(pk=main_inf_locality_data["code"])

        main_infrastructure = instance.main_infrastructure
        for key in main_infrastructure_data.keys():
            setattr(
                main_infrastructure,
                key,
                main_infrastructure_data.get(key, getattr(main_infrastructure, key)),
            )
        main_infrastructure.locality = main_inf_locality

        main_infrastructure.save()
        instance.main_infrastructure = main_infrastructure

    def update_provider(self, instance, validated_data):
        provider_data = validated_data.pop("provider")

        provider = None
        if provider_data:
            locality_data = provider_data.pop("locality")
            locality = Locality.objects.get(pk=locality_data["code"])

            if "id" in provider_data and provider_data["id"] is not None:
                provider = Provider.objects.get(pk=provider_data["id"])
                for key in provider_data.keys():
                    setattr(
                        provider, key, provider_data.get(key, getattr(provider, key))
                    )
                provider.locality = locality

                provider.save()
            else:
                provider = Provider.objects.create(**provider_data, locality=locality)

        instance.provider = provider

    def update_linked_localities(self, instance, validated_data):
        linked_localities_data_items = validated_data.pop("linked_localities")

        linked_localities_for_project = []
        for linked_locality_data in linked_localities_data_items:
            for value in linked_locality_data.values():
                linked_localities_for_project.append(value)

        instance.linked_localities.set(linked_localities_for_project)

    def update_contacts(self, instance, validated_data):
        # get the nested objects list
        contact_data_items = validated_data.pop("contacts", None)
        if contact_data_items:
            # get all nested objects related with this instance and make a dict(id, object)
            contact_items_dict = dict((i.id, i) for i in instance.contacts.all())

            contacts_for_project = []
            for contact_data in contact_data_items:
                if "id" in contact_data and contact_data["id"] is not None:
                    # if exists id remove from the dict and update
                    contact = contact_items_dict.pop(contact_data["id"], None)
                    if not contact:
                        contact = Contact.objects.get(pk=contact_data["id"])
                    # update attributes with validated data
                    for key in contact_data.keys():
                        setattr(
                            contact, key, contact_data.get(key, getattr(contact, key))
                        )

                    contact.save()
                    contacts_for_project.append(contact)
                else:
                    # else create a new object
                    contact = Contact.objects.create(**contact_data)
                    contacts_for_project.append(contact)

            instance.contacts.set(contacts_for_project)

    def update(self, instance, validated_data):

        self.update_main_infrastructure(instance, validated_data)
        self.update_provider(instance, validated_data)
        self.update_linked_localities(instance, validated_data)
        self.update_contacts(instance, validated_data)

        # nested entities properties were removed in previous methods
        for key in validated_data.keys():
            setattr(instance, key, validated_data.get(key, getattr(instance, key)))

        instance.save()
        return instance


class ProjectSummarySerializer(ProjectSerializer):
    locality = LocalitySerializer(source="main_infrastructure.locality")
    provider_name = serializers.CharField(source="provider.name", allow_null=True)

    class Meta(ProjectSerializer.Meta):
        fields = (
            "id",
            "name",
            "code",
            "featured_image",
            "locality",
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

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            fields[field].read_only = True
        return fields


class ProjectShortSerializer(ProjectSerializer):
    class Meta(ProjectSerializer.Meta):
        fields = ("id", "name", "code")
