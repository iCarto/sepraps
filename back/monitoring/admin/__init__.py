from django.conf.locale.es import formats as es_formats
from django.contrib import admin
from monitoring.admin.entrada_dominio_admin import DomainEntryAdmin
from monitoring.admin.financing_fund_admin import FinancingFundAdmin
from monitoring.admin.financing_program import FinancingProgramAdmin
from monitoring.models.domain_entry import DomainEntry
from monitoring.models.financing_fund import FinancingFund
from monitoring.models.financing_program import FinancingProgram
from monitoring.models.location import Department, District, Locality
from monitoring.models.project import Project
from monitoring.models.provider import Provider


es_formats.DATETIME_FORMAT = "d/m/Y H:i:s"

admin.site.site_header = "Administración de SEPRAPS"
admin.site.site_title = "Administración de SEPRAPS"
admin.site.index_title = "Bienvenido al sitio de Administración de SEPRAPS"

admin.site.register(DomainEntry, DomainEntryAdmin)
admin.site.register(FinancingFund, FinancingFundAdmin)
admin.site.register(FinancingProgram, FinancingProgramAdmin)
admin.site.register(Project)
admin.site.register(Provider)

admin.site.register(Department)
admin.site.register(District)
admin.site.register(Locality)
