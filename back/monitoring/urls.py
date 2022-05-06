from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from monitoring.views import index
from monitoring.views.constructrion_contract_viewset import ConstructionContractViewSet
from monitoring.views.contact_viewset import ContactViewSet
from monitoring.views.contractor_viewset import ContractorViewSet
from monitoring.views.domain_entry_viewset import DomainEntryViewSet
from monitoring.views.financing_fund_viewset import FinancingFundViewSet
from monitoring.views.financing_program_viewset import FinancingProgramViewSet
from monitoring.views.locality_viewset import LocalityViewSet
from monitoring.views.milestone_viewset import MilestoneViewSet
from monitoring.views.project_viewset import ProjectViewSet
from monitoring.views.provider_viewset import ProviderViewSet
from rest_framework import routers


router = routers.DefaultRouter(trailing_slash=False)
router.register(r"domainentries", DomainEntryViewSet)
router.register(r"financingfunds", FinancingFundViewSet)
router.register(r"financingprograms", FinancingProgramViewSet)
router.register(r"localities", LocalityViewSet)
router.register(r"projects", ProjectViewSet)
router.register(r"providers", ProviderViewSet)
router.register(r"contacts", ContactViewSet)
router.register(
    r"constructioncontracts",
    ConstructionContractViewSet,
    basename="constructioncontracts",
)
router.register(r"contractors", ContractorViewSet)
router.register(r"milestones", MilestoneViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("home", index, name="index"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
