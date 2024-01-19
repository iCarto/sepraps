from rest_framework import serializers

from domains.models import DomainEntry


class DomainEntrySerializer(serializers.ModelSerializer):
    class Meta(object):
        model = DomainEntry
        fields = "__all__"
