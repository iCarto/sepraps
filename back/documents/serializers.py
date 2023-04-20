from cgitb import lookup

from rest_framework import serializers

from documents.models import MediaNode


class HashHyperlinkedIdentityField(serializers.HyperlinkedIdentityField):
    def get_url(self, obj, view_name, request, format):
        """Adds a hash in the query string useful for caching resources"""
        url = super().get_url(obj, view_name, request, format)
        return url + "?date={}".format(obj.created_at.strftime("%Y%m%d%H%M%S%f"))


class MediaNodeSerializer(serializers.ModelSerializer):
    url = HashHyperlinkedIdentityField(
        lookup_field="media_path", view_name="preview-view"
    )
    creation_user = serializers.CharField(
        source="creation_user.username", required=False
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
            "media_size",
            "media_path",
            "storage_path",
            "parent",
            "creation_user",
            "created_at",
            "children",
        )
        extra_kwargs = {
            "parent": {"write_only": True},
            "storage_path": {"write_only": True},
        }

    def get_children(self, obj):
        return MediaLeafNodeSerializer(
            obj.children, many=True, context={"request": self.context.get("request")}
        ).data


class MediaLeafNodeSerializer(MediaNodeSerializer):
    class Meta(MediaNodeSerializer.Meta):
        fields = (
            "id",
            "url",
            "media_type",
            "media_name",
            "media_content_type",
            "media_size",
            "media_path",
            "creation_user",
            "created_at",
        )


class MediaUrlSerializer(serializers.ModelSerializer):
    url = HashHyperlinkedIdentityField(
        lookup_field="media_path", view_name="preview-view"
    )

    class Meta(object):
        model = MediaNode
        fields = ("url",)
