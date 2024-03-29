from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import permissions, viewsets

from app.models.location import Locality
from app.serializers.locality_serializer import LocalitySerializer


class LocalityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Locality.objects.prefetch_related("department", "district")
    serializer_class = LocalitySerializer
    permission_classes = [permissions.DjangoModelPermissions]

    # TODO review caching methodology when content changes
    # @method_decorator(cache_page(60 * 2))
    # def dispatch(self, request, *args, **kwargs):
    #    return super().dispatch(request, *args, **kwargs)
