from django.contrib import admin


class FinancingFundAdmin(admin.ModelAdmin):
    fields = ("short_name", "name")
