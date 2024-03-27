from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework import routers

from app.views import (
    certification_stats_views,
    events_views,
    notifications_views,
    payment_stats_views,
    project_stats_views,
    stats_views,
)
from app.views.amendment_viewset import AmendmentViewSet
from app.views.building_component_monitoring_viewset import (
    BuildingComponentMonitoringViewSet,
)
from app.views.building_component_viewset import BuildingComponentViewSet
from app.views.certification_viewset import CertificationViewSet
from app.views.comment_viewset import CommentViewSet
from app.views.connection_viewset import ConnectionViewSet
from app.views.construction_contract_viewset import ConstructionContractViewSet
from app.views.contact_relationship_viewset import (
    ContractContactViewSet,
    ContractorContactViewSet,
    ProviderContactViewSet,
)
from app.views.contact_viewset import ContactViewSet
from app.views.contract_service_viewset import ContractServiceViewSet
from app.views.contract_supervision_area_viewset import ContractSupervisionAreaViewSet
from app.views.contractor_viewset import ContractorViewSet
from app.views.field_report_project_activity_viewset import (
    FieldReportProjectActivityViewSet,
)
from app.views.field_report_project_viewset import FieldReportProjectViewSet
from app.views.field_report_viewset import FieldReportViewSet
from app.views.financing_fund_viewset import FinancingFundViewSet
from app.views.financing_program_viewset import FinancingProgramViewSet
from app.views.locality_viewset import LocalityViewSet
from app.views.milestone_viewset import MilestoneViewSet
from app.views.payment_viewset import PaymentViewSet
from app.views.product_viewset import ProductViewSet
from app.views.project_viewset import ProjectViewSet
from app.views.provider_viewset import ProviderViewSet
from app.views.social_component_monitoring_viewset import (
    SocialComponentMonitoringViewSet,
)
from app.views.social_component_training_viewset import SocialComponentTrainingViewSet


router = routers.DefaultRouter(trailing_slash=False)
router.register("financingfunds", FinancingFundViewSet)
router.register("financingprograms", FinancingProgramViewSet)
router.register("localities", LocalityViewSet)
router.register("projects", ProjectViewSet)
router.register("providers", ProviderViewSet)
router.register("providercontacts", ProviderContactViewSet)
router.register("fieldreports", FieldReportViewSet)
router.register("fieldreportprojects", FieldReportProjectViewSet)
router.register("fieldreportprojectactivities", FieldReportProjectActivityViewSet)
router.register("contacts", ContactViewSet)
router.register("contractcontacts", ContractContactViewSet)
router.register(
    "constructioncontracts",
    ConstructionContractViewSet,
    basename="constructioncontracts",
)
router.register("contractors", ContractorViewSet)
router.register("contractorcontacts", ContractorContactViewSet)
router.register("milestones", MilestoneViewSet)
router.register("payments", PaymentViewSet)
router.register("products", ProductViewSet)
router.register("comments", CommentViewSet)
router.register("contractservices", ContractServiceViewSet)
router.register("contractsupervisionareas", ContractSupervisionAreaViewSet)

router.register("buildingcomponents", BuildingComponentViewSet)
router.register("buildingcomponentmonitorings", BuildingComponentMonitoringViewSet)
router.register("socialcomponentmonitorings", SocialComponentMonitoringViewSet)
router.register("socialcomponenttrainings", SocialComponentTrainingViewSet)
router.register("connections", ConnectionViewSet)
router.register("amendments", AmendmentViewSet)
router.register("certifications", CertificationViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "stats/monthlyquestionnaires/<str:questionnaire_code>/<str:field_code>",
        stats_views.get_monthly_questionnaire_stats,
    ),
    path("stats/providersgender", stats_views.get_providers_gender_stats),
    path("stats/providerscontacts", stats_views.get_providers_contacts_stats),
    path(
        "stats/projectscontractsandproviders",
        stats_views.get_projects_contracts_providers_stats,
    ),
    path("stats/projectbyphase", stats_views.get_project_by_phase_stats),
    path("stats/projectbyphasemap", stats_views.get_projects_by_phase_map),
    path("paymentstats/temporal", payment_stats_views.get_payment_stats_temporal),
    path("paymentstats/payments", payment_stats_views.get_payment_stats_totals),
    path(
        "certificationstats/temporal",
        certification_stats_views.get_certification_stats_temporal,
    ),
    # path("certificationstats/certifications", certification_stats_views.get_certification_stats_totals),
    path("notifications", notifications_views.get_notifications),
    path("comingevents", events_views.get_coming_events),
    path(
        "projectstats/buildingcomponents/<str:group_code>",
        project_stats_views.get_building_components_stats,
    ),
    path(
        "projectstats/buildingcomponentstotal",
        project_stats_views.get_building_components_total_stats,
    ),
    path(
        "projectstats/bcprogresstotal", project_stats_views.get_bc_progress_total_stats
    ),
    path(
        "projectstats/socialcomponenttrainingssum",
        project_stats_views.get_social_component_trainings_sum_stats,
    ),
    path(
        "projectstats/socialcomponenttrainings/<str:group_code>",
        project_stats_views.get_social_component_trainings_multi_stats,
    ),
    path(
        "projectstats/connectionstotal", project_stats_views.get_connections_total_stats
    ),
    *static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT),
]
