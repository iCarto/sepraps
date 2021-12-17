from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework import routers

from monitoring.views import index
from monitoring.views.entrada_dominio_viewset import EntradaDominioViewSet
from monitoring.views.financing_fund_viewset import FinancingFundViewSet
from monitoring.views.financing_program_viewset import FinancingProgramViewSet


router = routers.DefaultRouter(trailing_slash=False)
router.register(r"entradasdominio", EntradaDominioViewSet)
router.register(r"financingfund", FinancingFundViewSet)
router.register(r"financingprogram", FinancingProgramViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("home", index, name="index"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

