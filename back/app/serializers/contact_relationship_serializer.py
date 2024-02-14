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


class ContactRelationshipListSerializer(serializers.ListSerializer):
    def get_contact_relationship_model(self):
        pass

    def get_contact_serializer(self):
        return ContactSerializer

    def update(self, entity, contacts, validated_data):
        if validated_data is None:
            return contacts

        contact_mapping = {contact.id: contact for contact in contacts}

        entity.contacts.clear()

        ret = []
        for item in validated_data:
            contact_id = item["contact"]["id"]

            post = item["post"]
            contact_data = item["contact"]
            if contact_id is None:
                entity_contact = self.get_contact_relationship_model()(
                    entity=entity,
                    contact=self.get_contact_serializer()().create(contact_data),
                    post=post,
                )
                entity_contact.save()
                ret.append(entity_contact)
                continue

            contact = contact_mapping.get(contact_id, None)
            if contact is None:
                contact = Contact.objects.get(pk=contact_id)
            entity_contact = self.get_contact_relationship_model()(
                entity=entity,
                contact=self.get_contact_serializer()().update(
                    instance=contact, validated_data=contact_data
                ),
                post=post,
            )
            entity_contact.save()
            ret.append(entity_contact)

        return ret


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
        list_serializer_class = ContactRelationshipListSerializer

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


class ContactProviderListSerializer(ContactRelationshipListSerializer):
    def get_contact_relationship_model(self):
        return ContactProviderSerializer.Meta.model


class ContactProviderSerializer(ContactRelationshipSerializer):
    class Meta(ContactRelationshipSerializer.Meta):
        model = ProviderContact
        list_serializer_class = ContactRelationshipListSerializer

    @classmethod
    def many_init(cls, *args, **kwargs):
        kwargs["child"] = cls()
        return ContactProviderListSerializer(*args, **kwargs)


class ContactContractorListSerializer(ContactRelationshipListSerializer):
    def get_contact_relationship_model(self):
        return ContactContractorSerializer.Meta.model


class ContactContractorSerializer(ContactRelationshipSerializer):
    class Meta(ContactRelationshipSerializer.Meta):
        model = ContractorContact
        list_serializer_class = ContactRelationshipListSerializer

    @classmethod
    def many_init(cls, *args, **kwargs):
        kwargs["child"] = cls()
        return ContactContractorListSerializer(*args, **kwargs)


class ContractContactListSerializer(ContactRelationshipListSerializer):
    def get_contact_relationship_model(self):
        return ContractContactSerializer.Meta.model


class ContractContactSerializer(ContactRelationshipSerializer):
    class Meta(ContactRelationshipSerializer.Meta):
        model = ContractContact
        list_serializer_class = ContractContactListSerializer

    @classmethod
    def many_init(cls, *args, **kwargs):
        kwargs["child"] = cls()
        return ContractContactListSerializer(*args, **kwargs)
