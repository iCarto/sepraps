from app.base.serializers.base_serializers import BaseModelSerializer
from app.models.connection import Connection
from app.serializers.comment_serializer import CommentSerializer


class ConnectionSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Connection
        fields = BaseModelSerializer.Meta.fields + (
            "id",
            "number_of_households",
            "population",
            "number_of_existing_connections",
            "number_of_planned_connections",
            "number_of_actual_connections",
            "connected_households_percentage",
            "coverage",
            "comments",
        )

    comments = CommentSerializer(read_only=True, many=True)
