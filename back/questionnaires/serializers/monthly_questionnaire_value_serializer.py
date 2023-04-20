from rest_framework import serializers

from questionnaires.models.monthly_questionnaire_value import MonthlyQuestionnaireValue


class MonthlyQuestionnaireValueListSerializer(serializers.ListSerializer):
    def update(self, instances, validated_data):
        if validated_data is None:
            return instances

        value_mapping = {instance.id: instance for instance in instances}
        data_mapping = {item["id"]: item for item in validated_data}

        ret = []
        for value_id, data in data_mapping.items():
            value = value_mapping.get(value_id, None)

            if value_id is None:
                ret.append(self.child.create(data))
                continue

            if value is None:
                value = MonthlyQuestionnaireValue.objects.get(pk=value_id)
            ret.append(self.child.update(value, data))

        return ret


class MonthlyQuestionnaireValueSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(allow_null=True, required=False)
    expected_value = serializers.CharField(allow_null=True, allow_blank=True)
    value = serializers.CharField(allow_null=True, allow_blank=True)

    class Meta(object):
        model = MonthlyQuestionnaireValue
        fields = ("id", "code", "datatype", "label", "expected_value", "value")
        list_serializer_class = MonthlyQuestionnaireValueListSerializer

    @classmethod
    def many_init(cls, *args, **kwargs):
        # Return MonthlyQuestionnaireValueListSerializer when many=True
        kwargs["child"] = cls()
        return MonthlyQuestionnaireValueListSerializer(*args, **kwargs)
