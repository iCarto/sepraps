from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices
from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseSummarySerializer,
)
from app.models.project import Project
from app.models.provider import Provider
from app.serializers.contact_relationship_serializer import ContactProviderSerializer


class ProviderSerializer(BaseDomainMixin, BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Provider
        fields = BaseModelSerializer.Meta.fields + (
            "name",
            "area",
            "type",
            "number_of_members",
            "number_of_women",
            "is_legalized",
            "legalization_date",
            "is_provider_contract_signed",
            "legal_status_number",
            "local_resolution_number",
            "project",
            "contacts",
        )
        extra_kwargs = {"project": {"write_only": True}}

    project = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=Project.objects.all(), allow_null=True, required=False
    )
    contacts = ContactProviderSerializer(
        source="providercontact_set", many=True, required=False
    )

    domain_fields = [
        BaseDomainField("area", DomainCategoryChoices.provider_area),
        BaseDomainField("type", DomainCategoryChoices.provider_type),
        BaseDomainField("is_legalized", DomainCategoryChoices.yes_no_domain),
        BaseDomainField(
            "is_provider_contract_signed", DomainCategoryChoices.yes_no_domain
        ),
    ]

    def create(self, validated_data):
        project = validated_data.pop("project", None)
        contacts = validated_data.pop("providercontact_set", None)

        provider = Provider.objects.create(**validated_data)

        # calling to ContactProviderListSerializer.update() we can make all modifications
        # for contacts inside the provider
        if contacts:
            self.fields["contacts"].update(provider, [], contacts)

        if project:
            project.provider = provider
            project.save()

        return provider

    def update(self, instance, validated_data):
        project = validated_data.pop("project", None)

        # calling to ContactProviderListSerializer.update() we can make all modifications
        # for contacts inside the provider
        contacts = validated_data.pop("providercontact_set", None)
        if contacts:
            self.fields["contacts"].update(instance, instance.contacts.all(), contacts)

        # nested entities properties were removed in previous methods
        for key in validated_data.keys():
            setattr(instance, key, validated_data.get(key, getattr(instance, key)))

        instance.save()

        if project:
            project.provider = instance
            project.save()

        return instance


class ProviderSummarySerializer(BaseDomainMixin, BaseSummarySerializer):
    class Meta(BaseSummarySerializer.Meta):
        model = Provider
        fields = BaseSummarySerializer.Meta.fields + (
            "name",
            "area",
            "type",
            "is_legalized",
        )

    domain_fields = [
        BaseDomainField("area", DomainCategoryChoices.provider_area),
        BaseDomainField("type", DomainCategoryChoices.provider_type),
        BaseDomainField("is_legalized", DomainCategoryChoices.yes_no_domain),
    ]
