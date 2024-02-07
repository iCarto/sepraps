import csv
from datetime import datetime
from io import BytesIO

from rest_framework import renderers

from app.base.views.renderers.utilities import (
    apply_fields_reindex,
    format_date_columns,
    format_float_columns,
    format_list_columns,
    get_df_from_response,
)


class DataFrameCSVFileRenderer(renderers.BaseRenderer):
    media_type = "text/csv"
    format = "csv"
    charset = None
    render_style = "binary"
    fields = {}

    def render(self, response, media_type=None, renderer_context=None):
        response_df = get_df_from_response(response)
        response_df = format_float_columns(response_df)
        response_df = format_list_columns(response_df)
        response_df = format_date_columns(response_df, "%d/%m/%Y")

        if self.fields:
            response_df = apply_fields_reindex(response_df, self.fields)

        if renderer_context is not None:
            path_split = renderer_context["request"].get_full_path().split("/")
            renderer_context["response"][
                "Content-Disposition"
            ] = "attachment; filename={0}.csv".format(
                "{0}_{1}".format(
                    datetime.now().strftime("%Y%m%d%H%M%S"), "_".join(path_split[-2:])
                )
            )

        buffer = BytesIO()
        response_df.to_csv(buffer, sep=";", quoting=csv.QUOTE_NONNUMERIC, index=False)
        return buffer.getvalue()
