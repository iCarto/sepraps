from django.contrib import admin

from monitoring.admin.entrada_dominio_admin import EntradaDominioAdmin
from monitoring.admin.financing_fund_admin import FinancingFundAdmin
from monitoring.admin.financing_program import FinancingProgramAdmin
from monitoring.models.entrada_dominio import EntradaDominio
from monitoring.models.financing_fund import FinancingFund
from monitoring.models.financing_program import FinancingProgram

from django.conf.locale.es import formats as es_formats


es_formats.DATETIME_FORMAT = "d/m/Y H:i:s"

admin.site.site_header = "Administración de SEPRAPS"
admin.site.site_title = "Administración de SEPRAPS"
admin.site.index_title = "Bienvenido al sitio de Administración de SEPRAPS"

admin.site.register(EntradaDominio, EntradaDominioAdmin)
admin.site.register(FinancingFund, FinancingFundAdmin)
admin.site.register(FinancingProgram, FinancingProgramAdmin)
