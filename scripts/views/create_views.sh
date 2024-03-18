this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null && pwd)"

source "${this_dir}"/../../server/variables.ini

${PSQL} -h localhost -p "${PG_PORT}" -U postgres -d "${DBNAME}" < "${this_dir}/views.sql"
