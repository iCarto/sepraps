import argparse
import csv
import json


def create_django_fixtures(data):
    fixtures_departments = []
    fixtures_districts = []
    fixtures_localities = []
    for locality in data:
        if not exist_in_fixtures(fixtures_departments, locality[1]):
            fixtures_departments.append(
                {
                    "model": "monitoring.department",
                    "pk": None,
                    "fields": {"code": locality[1], "name": locality[2].title()},
                }
            )
        if not exist_in_fixtures(fixtures_districts, locality[3]):
            fixtures_districts.append(
                {
                    "model": "monitoring.district",
                    "pk": None,
                    "fields": {
                        "code": locality[1] + locality[3],
                        "name": locality[4].title(),
                        "department": locality[1],
                    },
                }
            )
        fixtures_localities.append(
            {
                "model": "monitoring.locality",
                "pk": None,
                "fields": {
                    "code": locality[0],
                    "name": locality[7].title(),
                    "department": locality[1],
                    "district": locality[1] + locality[3],
                },
            }
        )

    fixtures = fixtures_departments + fixtures_districts + fixtures_localities

    print(json.dumps(fixtures))


def exist_in_fixtures(fixtures_list, code):
    return any(fixture["fields"]["code"] == code for fixture in fixtures_list)


def get_data(csv_input_file):
    localities = []
    with open(csv_input_file, encoding="iso-8859-1") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        line_count = 0
        for row in csv_reader:
            if line_count != 0:
                localities.append(row)
            line_count += 1

    return localities


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description=(
            "Has hardcoded paths to a csv file that allows to create a mock database"
        )
    )

    parser.add_argument(
        "file",
        help="Path to a file that lists the spreadsheets need to generate the database",
    )

    args = parser.parse_args()

    data = get_data(args.file)
    create_django_fixtures(data)
