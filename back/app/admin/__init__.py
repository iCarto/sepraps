from django.conf.locale.es import formats as es_formats
from django.contrib import admin
from app.admin.contact_admin import ContactAdmin
from app.admin.entrada_dominio_admin import DomainEntryAdmin
from app.admin.financing_fund_admin import FinancingFundAdmin
from app.admin.financing_program import FinancingProgramAdmin
from app.models.contact import Contact
from app.models.domain_entry import DomainEntry
from app.models.financing_fund import FinancingFund
from app.models.financing_program import FinancingProgram
from app.models.location import Department, District, Locality
from app.models.project import Project
from app.models.provider import Provider


es_formats.DATETIME_FORMAT = "d/m/Y H:i:s"

admin.site.site_header = "Administración de SEPRAPS"
admin.site.site_title = "Administración de SEPRAPS"
admin.site.index_title = "Bienvenido al sitio de Administración de SEPRAPS"

admin.site.register(DomainEntry, DomainEntryAdmin)
admin.site.register(FinancingFund, FinancingFundAdmin)
admin.site.register(FinancingProgram, FinancingProgramAdmin)
admin.site.register(Project)
admin.site.register(Provider)
admin.site.register(Contact, ContactAdmin)

admin.site.register(Department)
admin.site.register(District)
admin.site.register(Locality)
