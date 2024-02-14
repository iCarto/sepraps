from rest_framework import serializers

from app.models.contact import Contact


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
    class Meta(object):
        model = Contact
        fields = (
            "id",
            "name",
            "gender",
            "gender_name",
            "ci_number",
            "phone",
            "email",
            "comments",
            "is_staff",
        )
        extra_kwargs = {  # noqa: RUF012
            "ci_number": {"allow_null": True},
            "phone": {"allow_null": True, "allow_blank": True},
            "email": {"allow_null": True, "allow_blank": True},
            "comments": {"allow_null": True, "allow_blank": True},
        }

    id = serializers.IntegerField(allow_null=True, required=False)
    gender_name = serializers.SerializerMethodField()
    is_staff = serializers.SerializerMethodField()

    def get_gender_name(self, obj):
        return obj.get_gender_name()

    def get_is_staff(self, obj):
        return obj.user is not None
