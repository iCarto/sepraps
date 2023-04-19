from monitoring.models.construction_contract import ConstructionContract
from monitoring.models.contractor import Contractor
from monitoring.models.domain_entry import dominio_get_value
from monitoring.serializers.contact_relationship_serializer import (
    ContactContractorSerializer,
)
from monitoring.serializers.contact_serializer import ContactSerializer
from rest_framework import serializers


class ContractorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(allow_null=True, required=False)
    contractor_type_name = serializers.SerializerMethodField()
    contract = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=ConstructionContract.objects.all(), required=False
    )
    contacts = ContactContractorSerializer(
        source="contractorcontact_set", many=True, required=False
    )

    class Meta:
        model = Contractor
        fields = (
            "id",
            "name",
            "contractor_type",
            "contractor_type_name",
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

    def get_contractor_type_name(self, obj):
        return dominio_get_value(obj.contractor_type, self.context.get("domain"))

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
            "contractor_type_name",
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
