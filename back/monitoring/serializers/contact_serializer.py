from monitoring.models.contact import Contact
from monitoring.models.domain_entry import dominio_get_value
from rest_framework import serializers


class ContactListSerializer(serializers.ListSerializer):
    def update(self, contacts, validated_data):
        if validated_data is None:
            return contacts

        contact_mapping = {contact.id: contact for contact in contacts}
        data_mapping = {item["id"]: item for item in validated_data}

        ret = []
        for contact_id, data in data_mapping.items():
            contact = contact_mapping.get(contact_id, None)

            if contact_id is None:
                ret.append(self.child.create(data))
                continue

            if contact is None:
                contact = Contact.objects.get(pk=contact_id)
            ret.append(self.child.update(contact, data))

        return ret


class ContactSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(allow_null=True)
    post_name = serializers.SerializerMethodField()

    class Meta:
        model = Contact
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
        list_serializer_class = ContactListSerializer

    @classmethod
    def many_init(cls, *args, **kwargs):
        # Return ContactListSerializer when many=True
        kwargs["child"] = cls()
        return ContactListSerializer(*args, **kwargs)

    def get_post_name(self, obj):
        return dominio_get_value(obj.post)
