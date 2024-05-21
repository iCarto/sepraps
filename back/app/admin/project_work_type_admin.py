from django.contrib import admin


class ProjectWorkTypeAdmin(admin.ModelAdmin):
    fields = ("key", "value", "color", "config_file")
    list_display = ("key", "value")
    list_display_links = ("key",)

    def get_readonly_fields(self, request, obj):  # noqa: ARG002
        if obj is None:
            return []
        return ["key"]
