from domains.models import DomainEntry
from rest_framework import serializers


class DomainEntrySerializer(serializers.ModelSerializer):
    class Meta(object):
        model = DomainEntry
        fields = "__all__"
