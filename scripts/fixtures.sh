#!/bin/bash

this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

python "${this_dir}/database.py" "${this_dir}/data/Barrios_Localidades_Paraguay_Codigos_DGEEC.csv" > "${this_dir}/data/fixtures_location.json"
# To generate fixtures auth
# python manage.py dumpdata auth.Group users.User --natural-foreign --natural-primary --indent 4 > fixtures_auth.json
# And remove admin user inside file
rm -rf "${this_dir}/../back/media/"*
cp -r "${this_dir}/data/folder_data/"* "${this_dir}/../back/media/"

python "${this_dir}/../back/manage.py" loaddata "${this_dir}/data/fixtures_auth.json"
python "${this_dir}/../back/manage.py" loaddata "${this_dir}/data/fixtures_location.json"
python "${this_dir}/../back/manage.py" loaddata "${this_dir}/data/fixtures_data.json"
python "${this_dir}/../back/manage.py" loaddata "${this_dir}/data/fixtures_questionnaires.json"
python "${this_dir}/../back/manage.py" loaddata "${this_dir}/data/fixtures_project_questionnaires.json"
python "${this_dir}/../back/manage.py" loaddata "${this_dir}/data/fixtures_contrato_13_2019.json"
python "${this_dir}/../back/manage.py" loaddata "${this_dir}/data/fixtures_contrato_14_2019.json"
python "${this_dir}/../back/manage.py" loaddata "${this_dir}/data/fixtures_contrato_20_2019.json"
python "${this_dir}/../back/manage.py" loaddata "${this_dir}/data/fixtures_contrato_24_2019.json"
python "${this_dir}/../back/manage.py" loaddata "${this_dir}/data/fixtures_contrato_15_2019.json"
python "${this_dir}/../back/manage.py" loaddata "${this_dir}/data/fixtures_documents.json"
python "${this_dir}/../back/manage.py" loaddata "${this_dir}/data/fixtures_informes_viaje.json"
python "${this_dir}/../back/manage.py" loaddata "${this_dir}/data/fixtures_contrato_09_2020.json"
python "${this_dir}/../back/manage.py" loaddata "${this_dir}/data/fixtures_contrato_14_2021.json"
python "${this_dir}/../back/manage.py" shell < "${this_dir}/data/update_milestones.py"
python "${this_dir}/../back/manage.py" shell < "${this_dir}/data/set_featured_images.py"
python "${this_dir}/../back/manage.py" shell < "${this_dir}/data/import_domains.py"
python "${this_dir}/../back/manage.py" shell < "${this_dir}/data/set_activity_images.py"
