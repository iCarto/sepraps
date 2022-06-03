from questionnaires.models.monthly_questionnaire_instance import (
    MonthlyQuestionnaireInstance,
)
from questionnaires.serializers.monthly_questionnaire_value_serializer import (
    MonthlyQuestionnaireValueSerializer,
)
from rest_framework import serializers


class MonthlyQuestionnaireInstanceListSerializer(serializers.ListSerializer):
    def update(self, instances, validated_data):
        if validated_data is None:
            return instances

        instance_mapping = {instance.id: instance for instance in instances}

        ret = []
        for instance_data in validated_data:
            instance = instance_mapping.get(instance_data.get("id"), None)

            if instance_data.get("id") is None:
                ret.append(self.child.create(instance_data))
                continue

            if instance is None:
                instance = MonthlyQuestionnaireInstance.objects.get(
                    pk=instance_data.get("id")
                )
            ret.append(self.child.update(instance, instance_data))

        return ret


class MonthlyQuestionnaireInstanceSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(allow_null=True, required=False)
    comments = serializers.CharField(allow_null=True, allow_blank=True)
    creation_user = serializers.CharField(
        source="creation_user.username", required=False, read_only=True
    )
    values = MonthlyQuestionnaireValueSerializer(many=True)

    class Meta(object):
        model = MonthlyQuestionnaireInstance
        fields = (
            "id",
            "month",
            "year",
            "comments",
            "values",
            "creation_user",
            "created_at",
        )
        list_serializer_class = MonthlyQuestionnaireInstanceListSerializer

    @classmethod
    def many_init(cls, *args, **kwargs):
        # Return MonthlyQuestionnaireInstanceListSerializer when many=True
        kwargs["child"] = cls()
        return MonthlyQuestionnaireInstanceListSerializer(*args, **kwargs)

    def create(self, validated_data):

        values_data = validated_data.pop("values", None)

        validated_data["creation_user"] = self.context["request"].user
        instance = MonthlyQuestionnaireInstance.objects.create(**validated_data)

        instance.values.set(self.fields["values"].create(values_data))

        return instance

    def update(self, instance, validated_data):

        # calling to MonthlyQuestionnaireValueListSerializer.update() we can make all modifications
        # for values inside the instance
        instance.values.set(
            self.fields["values"].update(
                instance.values.all(), validated_data.pop("values", None)
            )
        )

        # nested entities properties were removed in previous methods
        for key in validated_data.keys():
            setattr(instance, key, validated_data.get(key, getattr(instance, key)))

        instance.save()

        return instance
