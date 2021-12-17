from django.contrib import admin


class FinancingProgramAdmin(admin.ModelAdmin):
    fields = ("name", "financing_fund")
    list_display = ("name", "financing_fund")
