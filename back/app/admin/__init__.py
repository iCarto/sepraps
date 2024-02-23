from django.conf.locale.es import formats as es_formats
from django.contrib import admin

from app.admin.contact_admin import ContactAdmin
from app.admin.financing_fund_admin import FinancingFundAdmin
from app.admin.financing_program import FinancingProgramAdmin
from app.models.comment import Comment
from app.models.contact import Contact
from app.models.contract_service import ContractService
from app.models.contract_service_value import ContractServiceValue
from app.models.contract_supervision_area import ContractSupervisionArea
from app.models.field_report_project import FieldReportProject
from app.models.field_report_project_activity import FieldReportProjectActivity
from app.models.financing_fund import FinancingFund
from app.models.financing_program import FinancingProgram
from app.models.location import Department, District, Locality
from app.models.payment import Payment
from app.models.project import Project
from app.models.project_work import ProjectWork
from app.models.provider import Provider


es_formats.DATETIME_FORMAT = "d/m/Y H:i:s"

admin.site.site_header = "Administración de SEPRAPS"
admin.site.site_title = "Administración de SEPRAPS"
admin.site.index_title = "Bienvenido al sitio de Administración de SEPRAPS"

admin.site.register(FinancingFund, FinancingFundAdmin)
admin.site.register(FinancingProgram, FinancingProgramAdmin)
admin.site.register(Project)
admin.site.register(ProjectWork)
admin.site.register(Provider)
admin.site.register(Contact, ContactAdmin)
admin.site.register(Payment)
admin.site.register(Comment)
admin.site.register(ContractService)
admin.site.register(ContractServiceValue)
admin.site.register(ContractSupervisionArea)


admin.site.register(Department)
admin.site.register(District)
admin.site.register(Locality)

# Only for fixtures (remove when endoints are implemented)
admin.site.register(FieldReportProject)
admin.site.register(FieldReportProjectActivity)
