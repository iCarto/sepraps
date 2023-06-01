from rest_framework.filters import OrderingFilter


class MappedOrderingFilter(OrderingFilter):
    ordering_field_mappping = {}

    def get_ordering(self, request, queryset, view):
        ordering = super().get_ordering(request, queryset, view)
        if ordering:
            field_map_with_desc = {}
            for field_key, field_value in self.ordering_field_mappping.items():
                field_map_with_desc[field_key] = field_value
                field_map_with_desc[f"-{field_key}"] = f"-{field_value}"
            return [field_map_with_desc.get(o, o) for o in ordering]
