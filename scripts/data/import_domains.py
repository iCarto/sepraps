import pandas as pd
from domains.models import DomainEntry


domains_file = pd.ExcelFile("scripts/data/230608_MD_SEPRAPS.xls")

domains_df = domains_file.parse(2)

for index, row in domains_df.iterrows():
    if index != 0:
        domain_entry = DomainEntry(
            category=str(row[8]).lower(),
            key=str(row[4]).lower().strip().replace(" ", "_"),
            value=str(row[4]).strip(),
        )
        domain_entry.save()
