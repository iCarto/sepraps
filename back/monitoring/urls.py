from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from monitoring.views import index
from monitoring.views.domain_entry_viewset import DomainEntryViewSet
from monitoring.views.financing_fund_viewset import FinancingFundViewSet
from monitoring.views.financing_program_viewset import FinancingProgramViewSet
from monitoring.views.project_viewset import ProjectViewSet
from rest_framework import routers


router = routers.DefaultRouter(trailing_slash=False)
router.register(r"domainentries", DomainEntryViewSet)
router.register(r"financingfunds", FinancingFundViewSet)
router.register(r"financingprograms", FinancingProgramViewSet)
router.register(r"projects", ProjectViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("home", index, name="index"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
