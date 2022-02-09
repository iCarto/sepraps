from monitoring.models.contact import Contact
from monitoring.models.location import Locality
from monitoring.models.project import Project
from monitoring.models.provider import Provider
from monitoring.serializers.contact_serializer import ContactSerializer
from monitoring.serializers.locality_serializer import LocalitySerializer
from rest_framework import serializers


class ProviderSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(allow_null=True, required=False)
    locality = LocalitySerializer()
    project = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=Project.objects.all()
    )
    contacts = ContactSerializer(many=True, required=False)

    class Meta:
        model = Provider
        fields = ("id", "name", "area", "locality", "project", "contacts")
        extra_kwargs = {"project": {"write_only": True}}

    def create(self, validated_data):

        locality_data = validated_data.pop("locality")
        locality = Locality.objects.get(pk=locality_data["code"])

        project = validated_data.pop("project")

        provider = Provider.objects.create(**validated_data, locality=locality)

        project.provider = provider
        project.save()

        return provider

    def update_contacts(self, instance, validated_data):
        # get the nested objects list
        contact_data_items = validated_data.pop("contacts", None)
        contacts_for_project = []

        if contact_data_items:
            # get all nested objects related with this instance and make a dict(id, object)
            contact_items_dict = dict((i.id, i) for i in instance.contacts.all())

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

        self.update_contacts(instance, validated_data)

        locality_data = validated_data.pop("locality")
        locality = Locality.objects.get(pk=locality_data["code"])
        instance.locality = locality

        project = validated_data.pop("project")

        # nested entities properties were removed in previous methods
        for key in validated_data.keys():
            setattr(instance, key, validated_data.get(key, getattr(instance, key)))

        instance.save()

        project.provider = instance
        project.save()

        return instance
