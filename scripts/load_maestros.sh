#!/bin/bash

python ./scripts/database.py ./scripts/data/Barrios_Localidades_Paraguay_Codigos_DGEEC.csv > ./scripts/data/fixtures_location.json
python manage.py loaddata ./scripts/data/fixtures_location.json
