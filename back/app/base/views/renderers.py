import csv
import locale
import numbers
import shutil
import tempfile
from datetime import datetime
from io import BytesIO
from pathlib import Path

import geopandas
import pandas as pd
from django.conf import settings
from rest_framework import renderers
from shapely import wkt
from shapely.geometry import shape


def get_df_from_response(response):
    if isinstance(response, pd.DataFrame):
        return response
    return pd.DataFrame(response)


def format_float(x):
    if pd.isna(x):
        return None
    if isinstance(x, numbers.Number):
        return locale.format_string("%.2f", x)  # noqa: WPS323
    return x


def format_float_columns(df):
    numeric_object_column_names = (
        df.select_dtypes("object")
        .apply(lambda x: pd.to_numeric(x, errors="coerce"))
        .dropna(axis=1, how="all")
    ).columns.tolist()
    float64_column_names = df.select_dtypes(include=["float64"]).columns.tolist()

    column_names = numeric_object_column_names + float64_column_names
    for column_name in column_names:
        df[column_name] = df[column_name].apply(format_float)
        df[column_name] = df[column_name].astype("string")

    return df


def get_geom_value(geom):
    if not geom:
        return None
    if isinstance(geom, str):
        return wkt.loads(geom)
    return shape(geom)


def get_geodf_from_response(response):
    geom_field = "geom"
    if response:
        if isinstance(response, pd.DataFrame):
            df = response
        else:
            df = pd.DataFrame(response)
            df[geom_field] = df[geom_field].apply(get_geom_value)
            df = geopandas.GeoDataFrame(
                df, geometry=geom_field, crs=settings.STORAGE_SRID
            )
    else:
        # working with empty dataframe
        df = geopandas.GeoDataFrame(columns=["id", geom_field], geometry=geom_field)

    df = df.set_crs("epsg:{0}".format(str(settings.STORAGE_SRID)))
    return df  # noqa: WPS331


def get_df_from_response(response):
    if isinstance(response, pd.DataFrame):
        return response
    if not response:
        return pd.DataFrame()
    return pd.DataFrame(response)


class DataFrameJSONRenderer(renderers.BaseRenderer):
    media_type = "application/json"
    format = "json"

    def render(self, response, media_type=None, renderer_context=None):
        df = get_df_from_response(response)
        df = format_float_columns(df)

        return pd.io.json.dumps(df.to_dict(orient="list"))


class DataFrameCSVFileRenderer(renderers.BaseRenderer):
    media_type = "text/csv"
    format = "csv"
    charset = None
    render_style = "binary"

    def render(self, response, media_type=None, renderer_context=None):
        df = get_df_from_response(response)
        df = format_float_columns(df)

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
        df.to_csv(buffer, sep=";", quoting=csv.QUOTE_NONNUMERIC, index=False)
        return buffer.getvalue()


class DataFrameGeojsonFileRenderer(renderers.BaseRenderer):
    media_type = "application/geo+json"
    format = "geojson"

    def render(self, response, media_type=None, renderer_context=None):
        df = get_geodf_from_response(response)
        df = format_float_columns(df)

        return df.to_json()


class DataFrameShapefileFileRenderer(renderers.BaseRenderer):
    media_type = "aplication/x-shapefile"
    format = "shp"
    charset = None
    render_style = "binary"

    def render(self, response, media_type=None, renderer_context=None):  # noqa: WPS210
        df = get_geodf_from_response(response)
        df = format_float_columns(df)

        if renderer_context is not None:
            now = datetime.now().strftime("%Y%m%d%H%M%S")
            request_path = renderer_context["request"].path.split("/")[-1:]
            filename = "{0}_{1}.shp.zip".format(now, "_".join(request_path))

            renderer_context["response"][
                "Content-Disposition"
            ] = "attachment; filename={0}".format(filename)

            # temp dir to store shp aux files and then create zip inside with to_file
            with tempfile.TemporaryDirectory() as temp_dir:
                temp_dir = Path(temp_dir)
                file_path = temp_dir / filename

                df.to_file(filename=file_path, driver="ESRI Shapefile")

                buffer = BytesIO()
                with open(file_path, "rb") as fh:
                    buffer.write(fh.read())

                shutil.rmtree(temp_dir)

                return buffer.getvalue()


class GeojsonRenderer(renderers.JSONRenderer):
    # https://www.iana.org/assignments/media-types/application/geo+json
    media_type = "application/geo+json"
    format = "geojson"
