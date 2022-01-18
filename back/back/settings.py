import locale
from datetime import timedelta

import environ

# from corsheaders.defaults import default_headers
from django.core.exceptions import ImproperlyConfigured


env = environ.Env(  # set default values and casting
    DEBUG=(bool, False),
    DEPLOYMENT=(str, "PROD"),
    HTTPS=(bool, True),
    ALLOWED_HOSTS=(list, []),
)

# Build paths inside the project like this: base('desired/local/path')

base = environ.Path(__file__) - 2  # Folder of manage.py
BASE_DIR = base()

root = environ.Path(__file__) - 1  # Folder of this file
PROJECT_ROOT = root()


environ.Env.read_env(env_file=base(".env"))  # reading .env file

# SECURITY WARNING: set a SECRET_KEY environment variable to a secret value
# before deploying to production!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")

# https://stackoverflow.com/questions/54504142/
# If in DEV is needed to access the app in a defined IP or URL fill .env with:
# ALLOWED_HOSTS=.localhost,127.0.0.1,[::1],THE_IP_OR_URL
ALLOWED_HOSTS = env("ALLOWED_HOSTS")

CSRF_COOKIE_SECURE = env("HTTPS")
SESSION_COOKIE_SECURE = env("HTTPS")
SESSION_EXPIRE_AT_BROWSER_CLOSE = env("HTTPS")


INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "whitenoise.runserver_nostatic",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "django_filters",
    "debug_toolbar",
    "django_extensions",
    "users",
    "monitoring",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "spa.middleware.SPAMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",  # early, but after Gzip
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "back.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        # "DIRS": [
        #     os.path.join(os.path.dirname(__file__), "templates"),
        #     # to find templates inside lotes app
        #     # if this folder is not set, base admin templates are not found
        #     BASE_DIR / "lotes/templates",
        # ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

WSGI_APPLICATION = "back.wsgi.application"


DATABASES = {"default": env.db()}


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": (
            "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
        )
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")


DEPLOYMENT = env("DEPLOYMENT")

if DEPLOYMENT == "dev":
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
    ADMINS = (("admin", "admin@localhost"),)
else:  # DEPLOYMENT == PROD
    # SECURE_SSL_REDIRECT = True
    # add extra apps
    # INSTALLED_APPS.append('raven.contrib.django.raven_compat')
    pass

# Media storage backend
try:
    BACKBLAZEB2_ACCOUNT_ID = env("BACKBLAZEB2_ACCOUNT_ID")
    BACKBLAZEB2_APP_KEY = env("BACKBLAZEB2_APP_KEY")
    BACKBLAZEB2_BUCKET_NAME = env("BACKBLAZEB2_BUCKET")
    DEFAULT_FILE_STORAGE = "b2_storage.storage.B2Storage"
    # INSTALLED_APPS.append('b2_storage.authorise')
except ImproperlyConfigured:  # use the default file storage to disk
    MEDIA_ROOT = base("media")
    MEDIA_URL = "/media/"

# Email sending
try:
    ANYMAIL = {
        # (exact settings here depend on your ESP...)
        "MAILGUN_API_KEY": env("MAILGUN_API_KEY"),
        # your Mailgun domain, if needed:
        "MAILGUN_SENDER_DOMAIN": env("MAILGUN_DOMAIN"),
    }
    EMAIL_BACKEND = "anymail.backends.mailgun.EmailBackend"
    # or sendgrid.EmailBackend, or...
except ImproperlyConfigured:
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

# Force setting locale for format methods
locale.setlocale(locale.LC_ALL, "es_ES.utf-8")

LANGUAGE_CODE = "es-PY"
TIME_ZONE = "America/Asuncion"
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

# STATIC_ROOT = root("staticfiles")
STATIC_ROOT = base("static")
STATIC_URL = "/static/"
# Extra places for collectstatic to find static files.
STATICFILES_DIRS = (root("static"), base("monitoring/static"))

# Django SPA - simple setup for serving modern SPAs from Django
# https://github.com/metakermit/django-spa
STATICFILES_STORAGE = "spa.storage.SPAStaticFilesStorage"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# from .logger import LOGGING

# Django REST Framework
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
        "rest_framework.permissions.DjangoModelPermissions",
    ],
    "DEFAULT_FILTER_BACKENDS": ("django_filters.rest_framework.DjangoFilterBackend",),
}


SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=24),
    "USER_ID_FIELD": "username",
    "USER_ID_CLAIM": "username",
}

# Django debug toolbar
INTERNAL_IPS = ["127.0.0.1"]

# CORS header settings
CORS_ALLOW_ALL_ORIGINS = True
# CORS_ORIGIN_WHITELIST = (
#     # 'example.com', # your domain
#     "http://localhost:3000",
#     "http://127.0.0.1:3000",
#     "http://localhost:8000",
#     "http://127.0.0.1:8000",
# )
CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOW_HEADERS = list(default_headers) + ["x-bulk-operation"]

AUTH_USER_MODEL = "users.User"
