from monitoring.models.domain_entry import DomainEntry
from rest_framework import serializers


class DomainEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DomainEntry
        fields = ("key", "value", "category", "ordering")
