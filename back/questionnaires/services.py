import locale
from functools import reduce

import pandas as pd
from questionnaires.models.questionnaire import Questionnaire


NONE_VALUE = "-"


def format_float(x):
    return "{0:.2f}".format(x) if not pd.isna(x) else None


def include_percentages(df, total_value):
    df["expected_values_perc"] = df.apply(
        lambda x: (x["expected_values"] * 100) / total_value, axis=1
    )

    df["expected_values_acc_perc"] = df.apply(
        lambda x: (x["expected_values_acc"] * 100) / total_value, axis=1
    )
    df["real_values_perc"] = df.apply(
        lambda x: (x["real_values"] * 100) / total_value if x["real_values"] else None,
        axis=1,
    )
    df["real_values_acc_perc"] = df.apply(
        lambda x: (x["real_values_acc"] * 100) / total_value, axis=1
    )
    df["variation_perc"] = df.apply(
        lambda x: x["real_values_perc"] - x["expected_values_perc"]
        if x["real_values_perc"]
        else None,
        axis=1,
    )
    df["expected_values_perc"] = df["expected_values_perc"].apply(format_float)
    df["expected_values_acc_perc"] = df["expected_values_acc_perc"].apply(format_float)
    df["real_values_perc"] = df["real_values_perc"].apply(format_float)
    df["real_values_acc_perc"] = df["real_values_acc_perc"].apply(format_float)
    df["variation_perc"] = df["variation_perc"].apply(format_float)


def create_dataframe_integer(index, expected_values, real_values):

    real_values = list(map(lambda x: int(x) if x else None, real_values))
    data = {"real_values": real_values}
    df = pd.DataFrame(data, index=index)
    df["real_values_acc"] = df["real_values"].cumsum()

    if expected_values:
        expected_values = list(map(lambda x: int(x) if x else None, expected_values))
        df["expected_values"] = expected_values

        # Sum of all expected values to get the total amount
        total_value_expected = df["expected_values"].sum()

        df["expected_values_acc"] = df["expected_values"].cumsum()
        df["variation"] = df.apply(
            lambda x: x["real_values"] - x["expected_values"]
            if x["real_values"]
            else None,
            axis=1,
        )

        include_percentages(df, total_value_expected)

    df = df.reset_index()

    return df


def create_dataframe_decimal2(index, expected_values, real_values):

    real_values = list(map(lambda x: locale.atof(x) if x else None, real_values))
    data = {"real_values": real_values}
    df = pd.DataFrame(data, index=index)
    df["real_values_acc"] = df["real_values"].cumsum()

    if expected_values:
        expected_values = list(
            map(lambda x: locale.atof(x) if x else None, expected_values)
        )
        df["expected_values"] = expected_values

        # Sum of all expected values to get the total amount
        total_value_expected = df["expected_values"].sum()

        df["expected_values_acc"] = df["expected_values"].cumsum()
        df["variation"] = df.apply(
            lambda x: x["real_values"] - x["expected_values"], axis=1
        )

        include_percentages(df, total_value_expected)

        df["expected_values"] = df["expected_values"].apply(format_float)
        df["expected_values_acc"] = df["expected_values_acc"].apply(format_float)
        df["variation"] = df["variation"].apply(format_float)

    df["real_values"] = df["real_values"].apply(format_float)
    df["real_values_acc"] = df["real_values_acc"].apply(format_float)

    df = df.reset_index()

    return df


def create_dataframe_str(index, expected_values, real_values):

    data = {"expected_values": expected_values, "real_values": real_values}
    df = pd.DataFrame(data, index=index)
    df = df.reset_index()
    return df


def create_dataframe(datatype, index, expected_values, real_values):
    print(real_values)
    if datatype == "integer":
        return create_dataframe_integer(index, expected_values, real_values)
    if datatype == "decimal2":
        return create_dataframe_decimal2(index, expected_values, real_values)
    return create_dataframe_str(index, expected_values, real_values)


def get_year_month_values(field_code, instances):

    year_month_values = {}
    for instance in instances:
        year_month = "{}/{}".format(instance.month, instance.year)
        if year_month not in year_month_values:
            year_month_values[year_month] = {"expected_values": [], "real_values": []}
        for field_value in (
            field_value
            for field_value in instance.values.all()
            if field_value.code == field_code
        ):
            year_month_values[year_month]["expected_values"].append(
                field_value.expected_value
            )
            year_month_values[year_month]["real_values"].append(field_value.value)
    return year_month_values


def parse_value(value, datatype):
    if datatype == "integer":
        return int(value)
    if datatype == "decimal2":
        return locale.format_string("%.2f", locale.atof(value))
    return value


def flat_values_list(values_list, datatype):
    if len(values_list) == 1:
        return values_list[0]
    if datatype == "integer":
        return reduce(lambda x, y: x + int(y) if y else x, values_list, 0)
    if datatype == "decimal2":
        result = reduce(lambda x, y: x + locale.atof(y) if y else x, values_list, 0)
        return locale.format_string("%.2f", result)
    return values_list


def get_monthly_questionnaire_instances_dataframe(
    questionnaire_code, field_code, instances
):

    questionnaire = Questionnaire.objects.get(pk=questionnaire_code)
    questionnaire_field = next(
        (field for field in questionnaire.fields if field.get("code") == field_code),
        None,
    )
    field_datatype = questionnaire_field.get("datatype")

    year_month_values = get_year_month_values(field_code, instances)

    print(year_month_values)
    df = create_dataframe(
        field_datatype,
        year_month_values.keys(),
        [
            flat_values_list(values["expected_values"], field_datatype)
            for _, values in year_month_values.items()
        ]
        if questionnaire_field.get("include_expected_value")
        else None,
        [
            flat_values_list(values["real_values"], field_datatype)
            for _, values in year_month_values.items()
        ],
    )
    df = df.fillna(NONE_VALUE)

    print(df)
    return df
