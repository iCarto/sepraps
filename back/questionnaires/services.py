import locale
from functools import reduce

import pandas as pd
from questionnaires.models.questionnaire import Questionnaire


NONE_VALUE = "-"


def has_value(x):
    return x is not None and not pd.isna(x)


def parse_list_to_float(values):
    return list(map(lambda x: locale.atof(x) if x else None, values))


def is_list_empty(values):
    return all(x is None or x == "" for x in values)


def get_last_value_from_serie(series):
    last_value = series.loc[lambda x: pd.isna(x) == False].tail(1).values
    return last_value[0] if last_value else None


def get_variation_value(value, reference_value, total_value):
    if has_value(value) and has_value(reference_value):
        return value - reference_value
    if has_value(value) and total_value:
        return value - total_value
    return None


def get_variation(df, column, reference_column):
    total_base_value = get_last_value_from_serie(df[reference_column])
    variation_series = df.apply(
        lambda x: get_variation_value(x[column], x[reference_column], total_base_value),
        axis=1,
    )
    return variation_series


def update_extended_with_real_value(df):
    # Get index for last month with expected value
    if "expected_values" in df:
        last_expected_value = (
            df["expected_values"].loc[lambda x: pd.isna(x) == False].tail(1)
        )
        # Find the real value for that month
        first_real_value_after_end = df.loc[
            last_expected_value.index, "real_values_acc"
        ]
        # Sum the real value to accumulated extended value to show the chart over the real value
        df["extended_values_acc"] = df.apply(
            lambda x: x["extended_values_acc"] + first_real_value_after_end.values[0]
            if has_value(x["extended_values_acc"])
            else None,
            axis=1,
        )
        # Set the first month with extended value with the executed value
        # to start the chart from the same point
        df.loc[
            last_expected_value.index, "extended_values_acc"
        ] = first_real_value_after_end.values[0]


def include_percentages_over_expected(df):

    expected_value_total = get_last_value_from_serie(df["expected_values_acc"])

    df["expected_values_perc"] = df.apply(
        lambda x: (x["expected_values"] * 100) / expected_value_total
        if has_value(x["expected_values"]) and expected_value_total
        else None,
        axis=1,
    )
    df["expected_values_acc_perc"] = df.apply(
        lambda x: (x["expected_values_acc"] * 100) / expected_value_total
        if has_value(x["expected_values_acc"]) and expected_value_total
        else None,
        axis=1,
    )
    df["real_values_perc"] = df.apply(
        lambda x: (x["real_values"] * 100) / expected_value_total
        if has_value(x["real_values"]) and expected_value_total
        else None,
        axis=1,
    )
    df["real_values_acc_perc"] = df.apply(
        lambda x: (x["real_values_acc"] * 100) / expected_value_total
        if has_value(x["real_values_acc"]) and expected_value_total
        else None,
        axis=1,
    )
    df["variation_perc"] = get_variation(
        df, "real_values_acc_perc", "expected_values_acc_perc"
    )


def create_dataframe_numeric(index, real_values, expected_values, extended_values):
    df = pd.DataFrame()
    df = df.assign(year_month=index)

    real_values_series = pd.Series(pd.to_numeric(real_values))
    df = df.assign(real_values=real_values_series)

    real_values_acc_series = real_values_series.cumsum()
    df = df.assign(real_values_acc=real_values_acc_series)

    if not is_list_empty(expected_values):
        expected_values_series = pd.Series(pd.to_numeric(expected_values))
        df = df.assign(expected_values=expected_values_series)
        expected_values_acc_series = expected_values_series.cumsum()
        df = df.assign(expected_values_acc=expected_values_acc_series)

        df = df.assign(
            variation=get_variation(df, "real_values_acc", "expected_values_acc")
        )
        include_percentages_over_expected(df)

    if not is_list_empty(extended_values):
        extended_values_series = pd.Series(pd.to_numeric(extended_values))
        df = df.assign(extended_values=extended_values_series)

        extended_values_acc_series = extended_values_series.cumsum()
        df = df.assign(extended_values_acc=extended_values_acc_series)

        update_extended_with_real_value(df)

    df = df.assign(real_values=real_values_series)

    df.set_index("year_month")

    return df


def create_dataframe_integer(index, real_values, expected_values, extended_values):
    df = create_dataframe_numeric(index, real_values, expected_values, extended_values)

    df["real_values"] = df["real_values"].astype(pd.Int64Dtype())
    df["real_values_acc"] = df["real_values_acc"].astype(pd.Int64Dtype())

    if "expected_values" in df:
        df["expected_values"] = df["expected_values"].astype(pd.Int64Dtype())
    if "expected_values_acc" in df:
        df["expected_values_acc"] = df["expected_values_acc"].astype(pd.Int64Dtype())
    if "extended_values" in df:
        df["extended_values"] = df["extended_values"].astype(pd.Int64Dtype())
    if "extended_values_acc" in df:
        df["extended_values_acc"] = df["extended_values_acc"].astype(pd.Int64Dtype())
    if "variation" in df:
        df["variation"] = df["variation"].astype(pd.Int64Dtype())

    return df


def create_dataframe_decimal2(index, real_values, expected_values, extended_values):
    real_values = parse_list_to_float(real_values)
    expected_values = parse_list_to_float(expected_values)
    extended_values = parse_list_to_float(extended_values)
    df = create_dataframe_numeric(index, real_values, expected_values, extended_values)

    return df


def create_dataframe_str(index, real_values, expected_values, extended_values):
    df = pd.DataFrame(year_month=index)

    df["expected_values"] = expected_values
    df["real_values"] = real_values
    df["extended_values"] = extended_values

    return df


def reorder_columns(df):
    column_names = ["year_month"]
    if "expected_values" in df:
        column_names.append("expected_values")
    if "expected_values_perc" in df:
        column_names.append("expected_values_perc")
    if "expected_values_acc" in df:
        column_names.append("expected_values_acc")
    if "expected_values_acc_perc" in df:
        column_names.append("expected_values_acc_perc")
    column_names.append("real_values")
    if "real_values_perc" in df:
        column_names.append("real_values_perc")
    column_names.append("real_values_acc")
    if "real_values_acc_perc" in df:
        column_names.append("real_values_acc_perc")
    if "variation" in df:
        column_names.append("variation")
    if "variation_perc" in df:
        column_names.append("variation_perc")

    return df.reindex(columns=column_names)


def create_dataframe(datatype, index, real_values, expected_values, extended_values):

    if datatype == "integer":
        df = create_dataframe_integer(
            index, real_values, expected_values, extended_values
        )
    elif datatype == "decimal2":
        df = create_dataframe_decimal2(
            index, real_values, expected_values, extended_values
        )
    else:
        df = create_dataframe_str(index, real_values, expected_values, extended_values)

    return reorder_columns(df)


def get_year_month_values(field_code, instances):

    year_month_values = {}
    for instance in instances:
        year_month = "{}/{}".format(instance.month, instance.year)
        if year_month not in year_month_values:
            year_month_values[year_month] = {
                "expected_values": [],
                "real_values": [],
                "extended_values": [],
            }
        for field_value in (
            field_value
            for field_value in instance.values.all()
            if field_value.code == field_code
        ):
            if not instance.extended:
                year_month_values[year_month]["expected_values"].append(
                    field_value.expected_value
                )
            else:
                year_month_values[year_month]["extended_values"].append(
                    field_value.expected_value
                )
            year_month_values[year_month]["real_values"].append(field_value.value)
    return year_month_values


def flat_values_list(values_list, datatype):
    """
    If data are integers or decimals sums all the values of the list.
    Used for aggregated filters like contracts or programs.
    """
    if len(values_list) == 0:
        return None
    if all([elem == None for elem in values_list]):
        return None
    if len(values_list) == 1:
        return values_list[0]
    if datatype == "integer":
        return reduce(lambda x, y: x + int(y) if y else x, values_list, 0)
    if datatype == "decimal2":
        result = reduce(lambda x, y: x + locale.atof(y) if y else x, values_list, 0)
        return locale.format_string("%.2f", result)
    return values_list


def get_monthly_questionnaire_instances_dataframe(
    questionnaire_code, field_code, instances, show_expanded=False
):
    questionnaire = Questionnaire.objects.get(pk=questionnaire_code)
    questionnaire_field = next(
        (field for field in questionnaire.fields if field.get("code") == field_code),
        None,
    )
    field_datatype = questionnaire_field.get("datatype")

    year_month_values = get_year_month_values(field_code, instances)

    df = create_dataframe(
        field_datatype,
        list(year_month_values.keys()),
        [
            flat_values_list(values["real_values"], field_datatype)
            for _, values in year_month_values.items()
        ],
        [
            flat_values_list(values["expected_values"], field_datatype)
            for _, values in year_month_values.items()
        ],
        [
            flat_values_list(values["extended_values"], field_datatype)
            for _, values in year_month_values.items()
        ]
        if show_expanded
        else [],
    )
    # df = df.fillna(NONE_VALUE)

    print(df)
    return df
