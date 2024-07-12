import json

import numpy as np
from rest_framework import renderers

from app.base.views.renderers.utilities import (
    format_date_columns,
    format_float_columns,
    get_df_from_response,
)


class DataFrameJSONRenderer(renderers.BaseRenderer):
    media_type = "application/json"
    format = "json"

    def render(self, response, media_type=None, renderer_context=None):
        response_df = get_df_from_response(response)
        response_df = format_float_columns(response_df)
        response_df = format_date_columns(response_df)
        response_df = response_df.replace({np.nan: None})

        return json.dumps(response_df.to_dict(orient="list"))
