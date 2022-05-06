from django.contrib import admin


class FinancingProgramAdmin(admin.ModelAdmin):
    fields = ("short_name", "name", "financing_funds")
    list_display = ("short_name", "name", "get_financing_funds")

    def get_financing_funds(self, obj):
        return ", ".join(
            [
                financing_funds.short_name
                for financing_funds in obj.financing_funds.all()
            ]
        )
