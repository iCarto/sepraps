from monitoring.models.entrada_dominio import EntradaDominio
from rest_framework import serializers


class EntradaDominioSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntradaDominio
        fields = ("key", "value", "category", "ordering")
