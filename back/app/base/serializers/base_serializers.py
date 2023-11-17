from rest_framework import serializers
from rest_framework_gis.fields import GeometryField
from rest_framework_gis.serializers import GeoFeatureModelSerializer

from documents.serializers import MediaUrlSerializer


class BaseEntityModelSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = None
        fields = ("id", "created_by", "created_at", "updated_by", "updated_at")
        extra_kwargs = {
            "created_by": {"read_only": True},
            "updated_by": {"read_only": True},
        }

    id = serializers.IntegerField(allow_null=True, required=False)
    created_by = serializers.CharField(
        required=False, source="created_by.username", read_only=True
    )
    updated_by = serializers.CharField(
        required=False, source="updated_by.username", read_only=True
    )


class BaseModelSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = None
        fields = (
            "id",
            "folder",
            "featured_image",
            "featured_document",
            "created_by",
            "created_at",
            "updated_by",
            "updated_at",
        )
        extra_kwargs = {
            "created_by": {"read_only": True},
            "updated_by": {"read_only": True},
        }

    id = serializers.IntegerField(allow_null=True, required=False)
    folder = serializers.SerializerMethodField()
    created_by = serializers.CharField(
        required=False, source="created_by.username", read_only=True
    )
    updated_by = serializers.CharField(
        required=False, source="updated_by.username", read_only=True
    )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if "featured_image" in response:
            response.update(
                {
                    "featured_image": (
                        MediaUrlSerializer(
                            instance.featured_image, context=self.context
                        ).data["url"]
                        if instance.featured_image is not None
                        else None
                    )
                }
            )
        if "featured_document" in response:
            response.update(
                {
                    "featured_document": (
                        MediaUrlSerializer(
                            instance.featured_document, context=self.context
                        ).data["url"]
                        if instance.featured_document is not None
                        else None
                    )
                }
            )
        return response

    def get_folder(self, obj):  # noqa: WPS615
        return obj.folder.media_path if obj.folder else None


class BaseModelWithFolderSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = None
        fields = (
            "id",
            "folder",
            "created_by",
            "created_at",
            "updated_by",
            "updated_at",
        )
        extra_kwargs = {
            "created_by": {"read_only": True},
            "updated_by": {"read_only": True},
        }

    id = serializers.IntegerField(allow_null=True, required=False)
    folder = serializers.SerializerMethodField()
    created_by = serializers.CharField(
        required=False, source="created_by.username", read_only=True
    )
    updated_by = serializers.CharField(
        required=False, source="updated_by.username", read_only=True
    )

    def get_folder(self, obj):  # noqa: WPS615
        return obj.folder.media_path if obj.folder else None


class BaseSummarySerializer(serializers.ModelSerializer):
    class Meta(object):
        model = None
        fields = ("id",)

    id = serializers.IntegerField(allow_null=True, required=False)

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for key_field, field in fields.items():
            if key_field:
                field.read_only = True
        return fields


class OptimizedGeoSerializer(GeoFeatureModelSerializer):
    class Meta(object):
        model = None
        geo_field = "geometry"  # In subclasses we must override 'geo_field' definition

    geometry = GeometryField()
