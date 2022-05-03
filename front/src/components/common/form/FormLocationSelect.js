import {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";

import {FormSelect} from "components/common/form";
import {useAdministrativeDivisions} from "components/common/provider";

import Grid from "@mui/material/Grid";

const getValueByPath = (object, path) => {
    return path.split(".").reduce((p, c) => (p && p[c]) || null, object);
};

const setValueByPath = (object, path, value) =>
    path
        .split(".")
        .reduce(
            (o, p, i) => (o[p] = path.split(".").length === ++i ? value : o[p] || {}),
            object
        );

const FormLocationSelect = ({name: propsName, orientation = "vertical"}) => {
    const {reset, getValues} = useFormContext();
    const {departments, districts, localities} = useAdministrativeDivisions();
    const [departmentDistricts, setDepartmentDistricts] = useState([]);
    const [districtLocalities, setDistrictLocalities] = useState([]);

    useEffect(() => {
        const values = getValues();
        const valuesDepartment = getValueByPath(values, `${propsName}.department`);
        if (valuesDepartment !== "") {
            setDepartmentDistricts(
                districts.filter(
                    district => district.department_code === valuesDepartment
                )
            );
        }
    }, [districts]);

    useEffect(() => {
        const values = getValues();
        const valuesDistrict = getValueByPath(values, `${propsName}.district`);
        if (valuesDistrict !== "") {
            setDistrictLocalities(
                localities.filter(locality => locality.district_code === valuesDistrict)
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
        setValueByPath(values, propsName, {
            department: selectedDepartment,
            department_name: departments.find(
                department => department.value === selectedDepartment
            ).label,
            district: "",
            district_name: "",
            code: "",
            name: "",
        });
        console.log({values});
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
        setValueByPath(values, propsName, {
            department: getValueByPath(values, `${propsName}.department`),
            department_name: getValueByPath(values, `${propsName}.department_name`),
            district: selectedDistrict,
            district_name: districts.find(
                district => district.value === selectedDistrict
            ).label,
            code: "",
            name: "",
        });
        reset({
            ...values,
        });
    };

    const onChangeLocality = selectedLocality => {
        console.log("onChangeLocality", {selectedLocality});
        const values = getValues();
        setValueByPath(values, propsName, {
            department: getValueByPath(values, `${propsName}.department`),
            department_name: getValueByPath(values, `${propsName}.department_name`),
            district: getValueByPath(values, `${propsName}.district`),
            district_name: getValueByPath(values, `${propsName}.district_name`),
            code: selectedLocality,
            name: districtLocalities.find(
                district => district.value === selectedLocality
            ).label,
        });
        reset({
            ...values,
        });
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={orientation === "vertical" ? 12 : 4}>
                <FormSelect
                    name={`${propsName}.department`}
                    label="Departamento"
                    rules={null}
                    options={departments}
                    onChangeHandler={onChangeDepartment}
                    showEmptyOption={true}
                />
            </Grid>
            <Grid item xs={12} md={orientation === "vertical" ? 12 : 4}>
                <FormSelect
                    name={`${propsName}.district`}
                    label="Distrito"
                    rules={null}
                    options={departmentDistricts}
                    onChangeHandler={onChangeDistrict}
                    showEmptyOption={true}
                />
            </Grid>
            <Grid item xs={12} md={orientation === "vertical" ? 12 : 4}>
                <FormSelect
                    name={`${propsName}.code`}
                    label="Localidad"
                    options={districtLocalities}
                    onChangeHandler={onChangeLocality}
                    showEmptyOption={true}
                />
            </Grid>
        </Grid>
    );
};

export default FormLocationSelect;
