from rest_framework import serializers

from app.models.comment import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Comment
        fields = ("text", "created_by", "created_at", "updated_by", "updated_at")
        extra_kwargs = {
            "created_by": {"read_only": True},
            "updated_by": {"read_only": True},
        }

    # TODO change BaseModelWithFolderSerializer hierarchy
    created_by = serializers.CharField(
        required=False, source="created_by.username", read_only=True
    )
    updated_by = serializers.CharField(
        required=False, source="updated_by.username", read_only=True
    )
