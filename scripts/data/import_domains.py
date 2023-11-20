import re
import unicodedata

import pandas as pd
from domains.models import DomainEntry


def format_value(value):
    result = "".join(
        c
        for c in unicodedata.normalize("NFD", str(value).strip().lower())
        if unicodedata.category(c) != "Mn"
    )
    result = re.sub("[ ]+", "_", result)
    result = re.sub("[^0-9a-zA-Z_-]", "", result)
    return re.sub("_+", "_", result)


domains_file = pd.ExcelFile("scripts/data/231120_MD_SEPRAPS.xls")

domains_df = domains_file.parse(16)

for index, row in domains_df.iterrows():
    if index != 0:
        domain_entry = DomainEntry(
            category=str(row[8]).lower(),
            key=format_value(row[4]),
            value=str(row[4]).strip(),
        )
        domain_entry.save()
