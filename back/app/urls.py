from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework import routers

from app.views import events_views, notifications_views, stats_views
from app.views.construction_contract_viewset import ConstructionContractViewSet
from app.views.contact_viewset import ContactViewSet
from app.views.contractor_viewset import ContractorViewSet
from app.views.financing_fund_viewset import FinancingFundViewSet
from app.views.financing_program_viewset import FinancingProgramViewSet
from app.views.locality_viewset import LocalityViewSet
from app.views.milestone_viewset import MilestoneViewSet
from app.views.project_viewset import ProjectViewSet
from app.views.provider_viewset import ProviderViewSet


router = routers.DefaultRouter(trailing_slash=False)
router.register("financingfunds", FinancingFundViewSet)
router.register("financingprograms", FinancingProgramViewSet)
router.register("localities", LocalityViewSet)
router.register("projects", ProjectViewSet)
router.register("providers", ProviderViewSet)
router.register("contacts", ContactViewSet)
router.register(
    "constructioncontracts",
    ConstructionContractViewSet,
    basename="constructioncontracts",
)
router.register("contractors", ContractorViewSet)
router.register("milestones", MilestoneViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path(
        "stats/monthlyquestionnaires/<str:questionnaire_code>/<str:field_code>",
        stats_views.get_monthly_questionnaire_stats,
    ),
    path("stats/contacts/gender", stats_views.get_provider_gender_stats),
    path("stats/projectandcontract", stats_views.get_project_and_contract_stats),
    path("stats/projectbyphase", stats_views.get_project_by_phase_stats),
    path("stats/projectbyphasemap", stats_views.get_projects_by_phase_map),
    path("notifications", notifications_views.get_notifications),
    path("comingevents", events_views.get_coming_events),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
