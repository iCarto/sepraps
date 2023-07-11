from app.base.serializers.base_serializers import BaseModelSerializer
from app.models.field_report_project_activity import FieldReportProjectActivity
from documents.serializers import MediaUrlSerializer


class FieldReportProjectActivitySerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = FieldReportProjectActivity
        fields = BaseModelSerializer.Meta.fields + (
            "title",
            "date",
            "notes",
            "image1",
            "image2",
            "image3",
            "image4",
            "field_report_project",
        )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        for image_field in ("image1", "image2", "image3", "image4"):
            if image_field in response:
                response.update(
                    {
                        image_field: (
                            MediaUrlSerializer(
                                getattr(instance, image_field), context=self.context
                            ).data["url"]
                            if getattr(instance, image_field) is not None
                            else None
                        )
                    }
                )
        return response
