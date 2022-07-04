import locale
from datetime import datetime
from io import BytesIO

import pandas as pd
from rest_framework import renderers


class DataFrameCSVFileRenderer(renderers.BaseRenderer):
    media_type = "text/csv"
    format = "csv"
    charset = None
    render_style = "binary"

    def render(self, response, media_type=None, renderer_context=None):
        if isinstance(response, pd.DataFrame):
            df = response
            float_column_names = df.select_dtypes(include=["float64"]).columns.tolist()
            for column_name in float_column_names:
                df[column_name] = df[column_name].apply(
                    lambda x: locale.format_string("%.2f", x)
                    if not pd.isna(x)
                    else None
                )

            if renderer_context is not None:
                path = renderer_context["request"].get_full_path()
                filename = "{}_{}".format(
                    datetime.now().strftime("%Y%m%d%H%M%S"),
                    "_".join(path.split("/")[-2:]),
                )
                renderer_context["response"][
                    "Content-Disposition"
                ] = "attachment; filename={}.csv".format(filename)

            buffer = BytesIO()
            df.to_csv(buffer, index=False)
            return buffer.getvalue()
        return response


class DataFrameJSONRenderer(renderers.BaseRenderer):
    media_type = "application/json"
    format = "json"

    def render(self, response, media_type=None, renderer_context=None):
        print(response)
        if isinstance(response, pd.DataFrame):
            df = response
            float_column_names = df.select_dtypes(include=["float64"]).columns.tolist()
            for column_name in float_column_names:
                df[column_name] = df[column_name].apply(
                    lambda x: "{0:.2f}".format(x) if not pd.isna(x) else None
                )
            return pd.io.json.dumps(df.to_dict(orient="list"))
        return pd.io.json.dumps(response)
