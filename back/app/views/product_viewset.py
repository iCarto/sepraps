from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.product import Product
from app.serializers.product_serializer import ProductSerializer


class ProductViewSet(ModelListAuditViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
