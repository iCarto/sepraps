from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices
from rest_framework import serializers

from app.models.construction_contract import ConstructionContract
from app.models.contractor import Contractor
from app.serializers.contact_relationship_serializer import ContactContractorSerializer


class ContractorSerializer(BaseDomainMixin, serializers.ModelSerializer):
    id = serializers.IntegerField(allow_null=True, required=False)
    contract = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=ConstructionContract.objects.all(), required=False
    )
    contacts = ContactContractorSerializer(
        source="contractorcontact_set", many=True, required=False
    )

    class Meta(object):
        model = Contractor
        fields = (
            "id",
            "name",
            "contractor_type",
            "address",
            "phone",
            "email",
            "comments",
            "contract",
            "contacts",
        )
        extra_kwargs = {
            "address": {"allow_null": True, "allow_blank": True},
            "phone": {"allow_null": True, "allow_blank": True},
            "email": {"allow_null": True, "allow_blank": True},
            "address": {"allow_null": True, "allow_blank": True},
            "comments": {"allow_null": True, "allow_blank": True},
            "contract": {"write_only": True},
        }

    domain_fields = [
        BaseDomainField("contractor_type", DomainCategoryChoices.contractor_type)
    ]

    def create(self, validated_data):
        contacts = validated_data.pop("contractorcontact_set", None)

        contract = validated_data.pop("contract", None)

        contractor = Contractor.objects.create(**validated_data)

        # calling to ContactProviderListSerializer.update() we can make all modifications
        # for contacts inside the provider
        if contacts:
            self.fields["contacts"].update(contractor, [], contacts)

        if contract:
            contract.contractor = contractor
            contract.save()

        return contractor

    def update(self, instance, validated_data):
        # calling to ContactProviderListSerializer.update() we can make all modifications
        # for contacts inside the provider
        contacts = validated_data.pop("contractorcontact_set", None)
        if contacts:
            self.fields["contacts"].update(instance, instance.contacts.all(), contacts)

        contract = validated_data.pop("contract", None)

        # nested entities properties were removed in previous methods
        for key in validated_data.keys():
            setattr(instance, key, validated_data.get(key, getattr(instance, key)))

        instance.save()

        if contract:
            contract.contractor = instance
            contract.save()

        return instance


class ContractorSummarySerializer(ContractorSerializer):
    class Meta(ContractorSerializer.Meta):
        fields = (
            "id",
            "name",
            "contractor_type",
            "address",
            "phone",
            "email",
            "comments",
        )

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            fields[field].read_only = True
        return fields

    domain_fields = [
        BaseDomainField("contractor_type", DomainCategoryChoices.contractor_type)
    ]
