import {useState} from "react";
import {useFormContext} from "react-hook-form";

import {useDomain} from "components/common/provider";
import {FormSelect} from "components/common/form";
import Grid from "@mui/material/Grid";

const FormLocationSelect = ({name: propsName, orientation = "vertical"}) => {
    const {reset, getValues} = useFormContext();
    const {departments, districts, localities} = useDomain();

    const [departmentDistricts, setDepartmentDistricts] = useState(() => {
        const values = getValues();
        if (values[propsName].department !== "") {
            return districts.filter(
                district => district.department_code === values[propsName].department
            );
        }
        return [];
    });
    const [districtLocalities, setDistrictLocalities] = useState(() => {
        const values = getValues();
        if (values[propsName].district !== "") {
            return localities.filter(
                locality => locality.district_code === values[propsName].district
            );
        }
        return [];
    });

    const onChangeDepartment = selectedDepartment => {
        console.log("onChangeDepartment", {selectedDepartment});
        const departmentDistricts = districts.filter(
            district => district.department_code === selectedDepartment
        );
        const values = getValues();
        values[propsName] = {
            department: selectedDepartment,
            district: "",
            locality: "",
        };
        reset({
            ...values,
        });
        setDepartmentDistricts(departmentDistricts);
        setDistrictLocalities([]);
    };

    const onChangeDistrict = selectedDistrict => {
        console.log("onChangeDistrict", {selectedDistrict});
        const districtLocalities = localities.filter(
            locality => locality.district_code === selectedDistrict
        );
        const values = getValues();
        values[propsName] = {
            department: values[propsName].department,
            district: selectedDistrict,
            locality: "",
        };
        reset({
            ...values,
        });
        setDistrictLocalities(districtLocalities);
    };

    return (
        <Grid container spacing={2}>
            <Grid item md={orientation === "vertical" ? 12 : 4} xs={12}>
                <FormSelect
                    name={`${propsName}.department`}
                    label="Departamento"
                    rules={null}
                    options={departments}
                    onChangeHandler={onChangeDepartment}
                />
            </Grid>
            <Grid item md={orientation === "vertical" ? 12 : 4} xs={12}>
                <FormSelect
                    name={`${propsName}.district`}
                    label="Distrito"
                    rules={null}
                    options={departmentDistricts}
                    onChangeHandler={onChangeDistrict}
                />
            </Grid>
            <Grid item md={orientation === "vertical" ? 12 : 4} xs={12}>
                <FormSelect
                    name={`${propsName}.locality`}
                    label="Localidad"
                    options={districtLocalities}
                />
            </Grid>
        </Grid>
    );
};

export default FormLocationSelect;
