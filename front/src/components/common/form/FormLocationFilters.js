import {useOutletContext} from "react-router-dom";
import {useForm} from "react-hook-form";

import {useAdministrativeDivisions} from "../provider";
import {FormSelectMultipleChip} from ".";

import Grid from "@mui/material/Grid";

const FormLocationFilters = ({onFilter, name: propsName}) => {
    const {reset, getValues} = useForm();
    const {departments, districts} = useAdministrativeDivisions();

    let context;
    [context] = useOutletContext();

    const {filterItems} = context;

    const activeDepartmentFilter = filterItems.find(item => item.key === "department");
    const activeDistrictFilter = filterItems.find(item => item.key === "district");

    let activeDepartmentFilterValue = activeDepartmentFilter
        ? [activeDepartmentFilter.value]
        : [];
    let activeDistrictFilterValue = activeDistrictFilter
        ? [activeDistrictFilter.value]
        : [];

    let departmentDistricts = districts.filter(
        district => district.department_code === activeDepartmentFilter?.value
    );

    const handleFilter = (selectedDivision, filterName) => {
        if (filterName === "department") {
            const values = getValues();
            values[propsName] = {
                department: selectedDivision,
            };
            reset({
                ...values,
            });
        }
        onFilter(selectedDivision, filterName);
    };

    return (
        <>
            <Grid item xs={6}>
                <FormSelectMultipleChip
                    name="department"
                    label="Departamento"
                    options={departments}
                    onFilter={handleFilter}
                    activeFilter={activeDepartmentFilterValue}
                />
            </Grid>
            <Grid item xs={6}>
                <FormSelectMultipleChip
                    name="district"
                    label="Distrito"
                    options={departmentDistricts}
                    onFilter={handleFilter}
                    activeFilter={activeDistrictFilterValue}
                />
            </Grid>
        </>
    );
};

export default FormLocationFilters;
