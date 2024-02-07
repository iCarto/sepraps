from rest_framework import renderers

from app.base.views.renderers.utilities import (
    format_float_columns,
    get_geodf_from_response,
)


class DataFrameGeojsonFileRenderer(renderers.BaseRenderer):
    media_type = "application/geo+json"
    format = "geojson"

    def render(self, response, media_type=None, renderer_context=None):
        response_df = get_geodf_from_response(response)
        response_df = format_float_columns(response_df)

        return response_df.to_json()
