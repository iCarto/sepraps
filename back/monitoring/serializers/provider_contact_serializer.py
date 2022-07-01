from attr import validate
from monitoring.models.contact import Contact
from monitoring.models.domain_entry import dominio_get_value
from monitoring.models.provider_contact import ProviderContact
from monitoring.serializers.contact_serializer import ContactSerializer
from rest_framework import serializers


class ProviderContactListSerializer(serializers.ListSerializer):
    def update(self, provider, contacts, validated_data):
        if validated_data is None:
            return contacts

        provider.contacts.clear()

        contact_serializer = ContactSerializer()

        contact_mapping = {contact.id: contact for contact in contacts}
        data_mapping = {item["contact"]["id"]: item for item in validated_data}

        ret = []
        for contact_id, data in data_mapping.items():
            contact = contact_mapping.get(contact_id, None)

            post = data.pop("post")
            contact_data = data.pop("contact")
            if contact_id is None:
                provider_contact = ProviderContact(
                    provider=provider,
                    contact=contact_serializer.create(contact_data),
                    post=post,
                )
                provider_contact.save()
                ret.append(provider_contact)
                continue

            if contact is None:
                contact = Contact.objects.get(pk=contact_id)
            provider_contact = ProviderContact(
                provider=provider,
                contact=contact_serializer.update(
                    instance=contact, validated_data=contact_data
                ),
                post=post,
            )
            provider_contact.save()
            ret.append(provider_contact)

        return ret


class ProviderContactSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="contact.id", allow_null=True)
    name = serializers.CharField(source="contact.name")
    post_name = serializers.SerializerMethodField()
    gender = serializers.CharField(source="contact.gender")
    phone = serializers.CharField(
        source="contact.phone", allow_null=True, allow_blank=True
    )
    email = serializers.CharField(
        source="contact.email", allow_null=True, allow_blank=True
    )
    comments = serializers.CharField(
        source="contact.comments", allow_null=True, allow_blank=True
    )

    class Meta:
        model = ProviderContact
        fields = (
            "id",
            "name",
            "post",
            "post_name",
            "gender",
            "phone",
            "email",
            "comments",
        )
        list_serializer_class = ProviderContactListSerializer

    @classmethod
    def many_init(cls, *args, **kwargs):
        # Return ContactListSerializer when many=True
        kwargs["child"] = cls()
        return ProviderContactListSerializer(*args, **kwargs)

    def get_post_name(self, obj):
        return dominio_get_value(obj.post, self.context.get("domain"))
