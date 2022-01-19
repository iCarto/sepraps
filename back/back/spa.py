from django.conf import settings
from spa.middleware import SPAMiddleware


class BackSPAMiddleware(SPAMiddleware):
    """Custom implementation to solve static value problems in
    index_name property inside SPAMiddleware.

    Using this class we can use the STATIC_URL configuration
    param to load index.html for a SPA front-end.

    """

    index_name = settings.STATIC_URL[1:] + "index.html"
