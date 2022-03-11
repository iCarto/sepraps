import {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";

import {FormSelect} from "components/common/form";

import Grid from "@mui/material/Grid";
import {useAdministrativeDivisions} from "components/common/provider";

const FormLocationSelect = ({name: propsName, orientation = "vertical"}) => {
    const {reset, getValues} = useFormContext();
    const {departments, districts, localities} = useAdministrativeDivisions();
    const [departmentDistricts, setDepartmentDistricts] = useState([]);
    const [districtLocalities, setDistrictLocalities] = useState([]);

    useEffect(() => {
        const values = getValues();
        if (values[propsName]?.department !== "") {
            setDepartmentDistricts(
                districts.filter(
                    district =>
                        district.department_code === values[propsName].department
                )
            );
        }
    }, [districts]);

    useEffect(() => {
        const values = getValues();
        if (values[propsName]?.district !== "") {
            setDistrictLocalities(
                localities.filter(
                    locality => locality.district_code === values[propsName].district
                )
            );
        }
    }, [localities]);

    const onChangeDepartment = selectedDepartment => {
        console.log("onChangeDepartment", {selectedDepartment});
        setDepartmentDistricts(
            districts.filter(
                district => district.department_code === selectedDepartment
            )
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
        setDistrictLocalities([]);
    };

    const onChangeDistrict = selectedDistrict => {
        console.log("onChangeDistrict", {selectedDistrict});
        setDistrictLocalities(
            localities.filter(locality => locality.district_code === selectedDistrict)
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
    };

    return (
        <Grid container>
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
