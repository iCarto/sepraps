import AuthApiService from "./AuthApiService";

const localitiesBasePath = "/api/monitoring/localities";

const LocationService = {
    getAdministrativeDivisions() {
        return AuthApiService.get(localitiesBasePath).then(response => {
            let administrativeDivisions = {
                departments: [],
                districts: [],
                localities: [],
            };
            response.forEach(locality => {
                if (
                    !administrativeDivisions.departments.find(
                        department => department.value === locality.department
                    )
                ) {
                    administrativeDivisions.departments.push({
                        value: locality.department,
                        label: locality.department_name,
                    });
                }
                if (
                    !administrativeDivisions.districts.find(
                        district => district.value === locality.district
                    )
                ) {
                    administrativeDivisions.districts.push({
                        value: locality.district,
                        label: locality.district_name,
                        department_code: locality.department,
                    });
                }
                administrativeDivisions.localities.push({
                    value: locality.code,
                    label: locality.name,
                    district_code: locality.district,
                    department_code: locality.department,
                });
            });
            administrativeDivisions.departments.sort((a, b) =>
                a.label.localeCompare(b.label)
            );
            administrativeDivisions.districts.sort((a, b) =>
                a.label.localeCompare(b.label)
            );
            administrativeDivisions.localities.sort((a, b) =>
                a.label.localeCompare(b.label)
            );
            return administrativeDivisions;
        });
    },
};

export default LocationService;
