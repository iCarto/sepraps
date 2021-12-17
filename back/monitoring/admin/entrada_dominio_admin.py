from django.contrib import admin


class EntradaDominioAdmin(admin.ModelAdmin):
    fields = ("category", "key", "value", "ordering")
    list_display = ("category", "key", "value", "ordering")
    list_display_links = ("key", "value")
    list_filter = ("category",)
    ordering = ("category", "ordering", "value")

    def get_readonly_fields(self, request, obj):
        if obj is None:
            return []
        return ["category", "key"]
