import datetime

from django.contrib.gis.db.models import GeometryField
from django.contrib.gis.db.models.functions import GeoFunc


def dictfetchall(cursor):
    """Return all rows from a cursor as a dict."""
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]


def is_geojson_request(request):
    return request.accepted_renderer.format == "geojson"


def format_date(date):
    date_split_reversed = date.split("/")[::-1]
    return datetime.date(
        int(date_split_reversed[0]),
        int(date_split_reversed[1]),
        int(date_split_reversed[2]),
    )


def format_decimal(value):
    return "{0:.2f}".format(value)


class MakePoint(GeoFunc):
    output_field = GeometryField()
    function = "ST_MakePoint"
