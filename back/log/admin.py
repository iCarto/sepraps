from django.contrib import admin

from log.models import LogRequest


FIELDS = (
    "date",
    "method",
    "endpoint",
    "username",
    "remote_address",
    "response_code",
    "exec_time",
)


@admin.register(LogRequest)
class LogRequestAdmin(admin.ModelAdmin):
    fields = FIELDS
    list_display = FIELDS
    list_display_links = ("endpoint",)
    readonly_fields = FIELDS
    ordering = ("-date",)

    def has_add_permission(self, request, obj=None):
        return False

    def changeform_view(self, request, object_id=None, form_url="", extra_context=None):
        extra_context = extra_context or {}
        extra_context["show_save_and_continue"] = False
        extra_context["show_save"] = False
        return super().changeform_view(request, object_id, extra_context=extra_context)

    def has_delete_permission(self, request, obj=None):
        return False
