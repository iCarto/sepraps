from app.models.contact import Contact
from app.models.contact_relationship import (
    ConstructionContractContact,
    ContractorContact,
    ProviderContact,
)
from app.models.domain_entry import dominio_get_value
from app.serializers.contact_serializer import ContactSerializer
from rest_framework import serializers


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


class ContactRelationshipSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="contact.id", allow_null=True)
    name = serializers.CharField(source="contact.name")
    post_name = serializers.SerializerMethodField()
    gender = serializers.CharField(source="contact.gender")
    gender_name = serializers.SerializerMethodField()
    phone = serializers.CharField(
        source="contact.phone", allow_null=True, allow_blank=True
    )
    email = serializers.CharField(
        source="contact.email", allow_null=True, allow_blank=True
    )
    comments = serializers.CharField(
        source="contact.comments", allow_null=True, allow_blank=True
    )
    is_staff = serializers.SerializerMethodField()

    class Meta:
        model = ProviderContact
        fields = (
            "id",
            "name",
            "post",
            "post_name",
            "gender",
            "gender_name",
            "phone",
            "email",
            "comments",
            "is_staff",
        )
        list_serializer_class = ContactRelationshipListSerializer

    def get_post_name(self, obj):
        return dominio_get_value(obj.post, self.context.get("domain"))

    def get_gender_name(self, obj):
        return obj.contact.get_gender_name()

    def get_is_staff(self, obj):
        return obj.contact.user is not None


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


class ContactConstructionContractListSerializer(ContactRelationshipListSerializer):
    def get_contact_relationship_model(self):
        return ContactConstructionContractSerializer.Meta.model


class ContactConstructionContractSerializer(ContactRelationshipSerializer):
    class Meta(ContactRelationshipSerializer.Meta):
        model = ConstructionContractContact
        list_serializer_class = ContactConstructionContractListSerializer

    @classmethod
    def many_init(cls, *args, **kwargs):
        kwargs["child"] = cls()
        return ContactConstructionContractListSerializer(*args, **kwargs)
