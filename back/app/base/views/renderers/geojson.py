from rest_framework import renderers


class GeojsonRenderer(renderers.JSONRenderer):
    # https://www.iana.org/assignments/media-types/application/geo+json
    media_type = "application/geo+json"
    format = "geojson"
