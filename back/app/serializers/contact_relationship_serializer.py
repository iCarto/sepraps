from rest_framework import serializers

from app.models.contact import Contact
from app.models.contact_relationship import (
    ContactRelationship,
    ContractContact,
    ContractorContact,
    ProviderContact,
)
from app.serializers.contact_serializer import ContactSerializer
from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices


class ContactRelationshipSerializer(BaseDomainMixin, serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    contact_id = serializers.IntegerField(
        source="contact.id", allow_null=True, required=False
    )
    name = serializers.CharField(
        source="contact.name", allow_null=True, allow_blank=True, required=False
    )
    gender = serializers.CharField(
        source="contact.gender", allow_null=True, allow_blank=True, required=False
    )
    gender_name = serializers.SerializerMethodField()
    ci_number = serializers.CharField(
        source="contact.ci_number", allow_null=True, required=False
    )
    phone = serializers.CharField(
        source="contact.phone", allow_null=True, allow_blank=True, required=False
    )
    email = serializers.CharField(
        source="contact.email", allow_null=True, allow_blank=True, required=False
    )
    comments = serializers.CharField(
        source="contact.comments", allow_null=True, allow_blank=True, required=False
    )
    is_staff = serializers.SerializerMethodField()

    class Meta(object):
        model = ContactRelationship
        fields = (
            "id",
            "contact_id",
            "entity",
            "post",
            "name",
            "gender",
            "gender_name",
            "ci_number",
            "phone",
            "email",
            "comments",
            "is_staff",
        )

    def get_gender_name(self, obj):
        return obj.contact.get_gender_name()

    def get_is_staff(self, obj):
        return obj.contact.user is not None

    domain_fields = (BaseDomainField("post", DomainCategoryChoices.contact_post),)

    def create(self, validated_data):
        contact_relationship_model = self.Meta.model

        post = validated_data.pop("post")
        entity = validated_data.pop("entity")
        contact_data = validated_data.pop("contact")
        if contact_data.get("id") is None:
            # Creating a new contact with the relationship
            contact_serializer = ContactSerializer(data=contact_data)
            if not contact_serializer.is_valid():
                raise serializers.ValidationError(contact_serializer.errors)
            contact = contact_serializer.save()
            relationship = contact_relationship_model(
                entity=entity, post=post, contact=contact
            )
            relationship.save()
            return relationship

        # Creating a relationship with an existing contact
        try:
            contact = Contact.objects.get(pk=contact_data.get("id"))
        except Contact.DoesNotExist as ex:
            raise serializers.ValidationError({"id": "El contacto no existe"}) from ex

        relationship = contact_relationship_model(
            entity=entity, post=post, contact=contact
        )
        relationship.save()
        return relationship

    def update(self, instance, validated_data):
        contact_relationship_model = self.Meta.model

        contact_data = validated_data.pop("contact")
        try:
            contact = Contact.objects.get(pk=contact_data.get("id"))
        except Contact.DoesNotExist as ex:
            raise serializers.ValidationError({"id": "El contacto no existe"}) from ex

        contact_serializer = ContactSerializer(contact, data=contact_data)
        if not contact_serializer.is_valid():
            raise serializers.ValidationError(contact_serializer.errors)
        contact = contact_serializer.save()

        relationship = contact_relationship_model(
            **validated_data, id=instance.id, contact=contact
        )
        relationship.save()
        return relationship


class ProviderContactSerializer(ContactRelationshipSerializer):
    class Meta(ContactRelationshipSerializer.Meta):
        model = ProviderContact


class ContractorContactSerializer(ContactRelationshipSerializer):
    class Meta(ContactRelationshipSerializer.Meta):
        model = ContractorContact


class ContractContactSerializer(ContactRelationshipSerializer):
    class Meta(ContactRelationshipSerializer.Meta):
        model = ContractContact
