from rest_framework import serializers

from app.models.domain_entry import DomainEntry


class DomainEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DomainEntry
        fields = ("key", "value", "category", "ordering")