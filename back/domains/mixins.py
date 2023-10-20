from domains.models import DomainEntry
from domains.util.domain_entry_util import dominio_get_label
from rest_framework import serializers


def relation_method_factory(domain_values, field_name, domain):
    def wrapper(self):
        return dominio_get_label(getattr(self, field_name), domain, domain_values)

    return wrapper


class BaseDomainField(object):
    def __init__(self, name, domain_choices, many=False):
        self.name = name
        self.domain_choices = domain_choices
        self.many = many


# Mixins for serializers must define a metaclass attribute so as not to break inheritance
# (https://stackoverflow.com/a/58304791)
class BaseDomainMixin(object, metaclass=serializers.SerializerMetaclass):
    """Serializer to use as parent for those who wants to include domain fields and add a new 'xxx_label' attribute for a 'xxx' field."""

    domain_fields = None
    domain_values = DomainEntry.objects.all()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for domain_field in self.get_domain_fields():
            if domain_field.many is True:
                self.fields[domain_field.name] = serializers.ListField(
                    child=serializers.IntegerField()
                )
            self.fields[
                "{0}_label".format(domain_field.name)
            ] = serializers.SerializerMethodField()
            setattr(
                self,
                "get_{0}_label".format(domain_field.name),
                relation_method_factory(
                    self.domain_values, domain_field.name, domain_field.domain_choices
                ),
            )

    def get_domain_fields(self):  # noqa: WPS615
        """Return the class to use for the serializer in a 'list' action.

        Defaults to using `self.domain_fields`.
        """
        return self.domain_fields or []
