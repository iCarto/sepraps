from rest_framework import serializers

from app.models.comment import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Comment
        fields = (
            "id",
            "text",
            "created_by",
            "created_by_label",
            "created_at",
            "updated_by",
            "updated_at",
        )
        extra_kwargs = {
            "created_by": {"read_only": True},
            "updated_by": {"read_only": True},
        }

    # TODO change BaseModelWithFolderSerializer hierarchy
    created_by = serializers.CharField(
        required=False, source="created_by.username", read_only=True
    )
    created_by_label = serializers.SerializerMethodField()
    updated_by = serializers.CharField(
        required=False, source="updated_by.username", read_only=True
    )

    def get_created_by_label(self, obj):
        user = obj.created_by
        if user:
            if user.first_name and user.last_name:
                return f"{user.first_name} {user.last_name}"
            return user.username
        return ""
