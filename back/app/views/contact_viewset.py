from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, viewsets

from app.models.contact import Contact
from app.serializers.contact_serializer import ContactSerializer


class ContactFilter(filters.FilterSet):
    search = filters.CharFilter(method="filter_by_search_text")
    posts = filters.CharFilter(method="filter_by_posts")

    def filter_by_search_text(self, queryset, name, search_text):
        return queryset.filter(
            Q(name__icontains=search_text)
            | Q(email__icontains=search_text)
            | Q(phone__icontains=search_text)
        )

    def filter_by_posts(self, queryset, name, posts):
        posts = posts.split(",")
        return queryset.filter(post__in=posts)

    class Meta(object):
        model = Contact
        fields = ("search",)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = ContactFilter
    serializer_class = ContactSerializer
    permission_classes = [permissions.DjangoModelPermissions]
