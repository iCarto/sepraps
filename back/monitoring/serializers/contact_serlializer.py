from monitoring.models.contact import Contact
from monitoring.models.domain_entry import dominio_get_value
from rest_framework import serializers


class ContactSerializer(serializers.ModelSerializer):

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

    def get_post_name(self, obj):
        return dominio_get_value(obj.post)
