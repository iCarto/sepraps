import {useState} from "react";
import {useForm} from "react-hook-form";

import {useAdministrativeDivisions} from "../provider";
import {FormSelectMultipleChip} from ".";

import Grid from "@mui/material/Grid";

const FormLocationFilters = ({onFilter, name: propsName}) => {
    const {reset, getValues} = useForm();
    const {departments, districts} = useAdministrativeDivisions();
    const [departmentDistricts, setDepartmentDistricts] = useState([]);

    const handleFilter = (selectedDivision, filterName) => {
        if (filterName === "department") {
            setDepartmentDistricts(
                districts.filter(
                    district => district.department_code === selectedDivision
                )
            );
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

    const handleClear = params => {
        console.log(params);
    };

    return (
        <>
            <Grid item xs={6}>
                <FormSelectMultipleChip
                    name="department"
                    label="Departamento"
                    options={departments}
                    onFilter={handleFilter}
                    onClear={handleClear}
                />
            </Grid>
            <Grid item xs={6}>
                <FormSelectMultipleChip
                    name="district"
                    label="Distrito"
                    options={departmentDistricts}
                    onFilter={handleFilter}
                    onClear={handleClear}
                />
            </Grid>
        </>
    );
};

export default FormLocationFilters;
