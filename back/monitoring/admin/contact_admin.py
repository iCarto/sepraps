from django.contrib import admin


class ContactAdmin(admin.ModelAdmin):
    fields = ("name", "gender", "phone", "email", "comments", "user")
    list_display = ("name", "phone", "email", "user")
    list_display_links = ("name",)
    list_filter = ("name",)
    ordering = ("name",)
