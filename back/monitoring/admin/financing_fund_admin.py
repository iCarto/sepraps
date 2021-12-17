from django.contrib import admin


class FinancingFundAdmin(admin.ModelAdmin):
    fields = ("name",)
