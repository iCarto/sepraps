import datetime


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]


def formatDate(date):
    date_split_reversed = date.split("/")[::-1]
    return datetime.date(
        int(date_split_reversed[0]),
        int(date_split_reversed[1]),
        int(date_split_reversed[2]),
    )
