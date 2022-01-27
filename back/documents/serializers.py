from cgitb import lookup

from documents.models import MediaNode
from rest_framework import serializers


class MediaNodeSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        lookup_field="path", view_name="media-view"
    )
    children = serializers.SerializerMethodField()

    class Meta(object):
        model = MediaNode
        fields = (
            "id",
            "url",
            "media_type",
            "media_name",
            "media_content_type",
            "parent",
            "children",
            "media_path",
        )
        extra_kwargs = {
            "parent": {"write_only": True},
            "media_path": {"write_only": True},
        }

    def get_children(self, obj):
        return MediaLeafNodeSerializer(
            obj.children, many=True, context={"request": self.context.get("request")}
        ).data


class MediaLeafNodeSerializer(MediaNodeSerializer):
    class Meta(MediaNodeSerializer.Meta):
        fields = ("id", "url", "media_type", "media_name", "media_content_type")
