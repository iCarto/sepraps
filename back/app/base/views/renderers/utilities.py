import locale
import numbers

import geopandas
import pandas as pd
from django.conf import settings
from shapely import wkt
from shapely.geometry import shape


def format_float(x):
    if pd.isna(x):
        return None
    if isinstance(x, numbers.Number):
        return locale.format_string("%.2f", x)
    return x


def has_list(x):
    return any(isinstance(i, list) for i in x)


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


def format_list_columns(df):
    mask = df.apply(has_list)
    column_names = df.columns[mask].tolist()

    for column_name in column_names:
        df[column_name] = df[column_name].apply(
            lambda x: ", ".join(map(str, x)) if isinstance(x, list) else None
        )

    return df


def format_date_columns(df, date_format="%Y-%m-%d"):
    date_object_column_names = (
        df.select_dtypes(["datetime64", "datetimetz"]).dropna(axis=1, how="all")
    ).columns.tolist()
    print(date_object_column_names)

    for column_name in date_object_column_names:
        df[column_name] = pd.to_datetime(df[column_name]).dt.strftime(date_format)

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

    df = df.set_crs(f"epsg:{settings.STORAGE_SRID!s}")
    return df


def get_df_from_response(response):
    if isinstance(response, pd.DataFrame):
        return response
    if not response:
        return pd.DataFrame()
    return pd.DataFrame(response)


def apply_fields_reindex(df, fields):
    df = df.reindex(columns=fields.keys())
    columns = {}
    for column_key in fields:
        columns[column_key] = fields[column_key].get("name", column_key)

    return df.rename(columns=columns)
