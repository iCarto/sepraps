import {useEffect, useState} from "react";
import {useFormContext, useWatch} from "react-hook-form";

import {FormSelect} from "components/common/form";
import {useAdministrativeDivisions} from "components/common/provider";

import Grid from "@mui/material/Grid";
import FormCheckbox from "./FormCheckbox";
import FormInputText from "./FormInputText";

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
    const {control, reset, getValues} = useFormContext();
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
        const department = departments.find(
            department => department.value === selectedDepartment
        );
        const values = getValues();
        setValueByPath(values, propsName, {
            department: selectedDepartment,
            department_name: department ? department.label : "",
            district: "",
            district_name: "",
            code: "",
            name: "",
        });
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
        const district = districts.find(
            district => district.value === selectedDistrict
        );
        const values = getValues();
        setValueByPath(values, propsName, {
            department: getValueByPath(values, `${propsName}.department`),
            department_name: getValueByPath(values, `${propsName}.department_name`),
            district: selectedDistrict,
            district_name: district ? district.label : "",
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
        const locality = districtLocalities.find(
            district => district.value === selectedLocality
        );
        setValueByPath(values, propsName, {
            department: getValueByPath(values, `${propsName}.department`),
            department_name: getValueByPath(values, `${propsName}.department_name`),
            district: getValueByPath(values, `${propsName}.district`),
            district_name: getValueByPath(values, `${propsName}.district_name`),
            code: selectedLocality,
            name: locality ? locality.label : "",
        });
        reset({
            ...values,
        });
    };

    const onChangeNonExistent = nonExistent => {
        console.log({nonExistent});
        if (nonExistent) {
            const values = getValues();
            setValueByPath(values, propsName, {
                non_existent: true,
                department: getValueByPath(values, `${propsName}.department`),
                department_name: getValueByPath(values, `${propsName}.department_name`),
                district: getValueByPath(values, `${propsName}.district`),
                district_name: getValueByPath(values, `${propsName}.district_name`),
                code: "",
                name: "",
            });
            reset({
                ...values,
            });
        }
    };

    const department = useWatch({
        control,
        name: `${propsName}.department`,
    });

    const district = useWatch({
        control,
        name: `${propsName}.district`,
    });

    const nonExistent = useWatch({
        control,
        name: `${propsName}.non_existent`,
    });

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={orientation === "vertical" ? 12 : 3}>
                <FormSelect
                    name={`${propsName}.department`}
                    label="Departamento"
                    rules={null}
                    options={departments}
                    onChangeHandler={onChangeDepartment}
                    showEmptyOption={true}
                />
            </Grid>
            <Grid item xs={12} md={orientation === "vertical" ? 12 : 3}>
                <FormSelect
                    name={`${propsName}.district`}
                    label="Distrito"
                    rules={null}
                    options={departmentDistricts}
                    onChangeHandler={onChangeDistrict}
                    showEmptyOption={true}
                    disabled={department === ""}
                />
            </Grid>
            <Grid item xs={12} md={orientation === "vertical" ? 12 : 4}>
                {nonExistent ? (
                    <FormInputText
                        name={`${propsName}.name`}
                        label="Localidad"
                        disabled={district === ""}
                    />
                ) : (
                    <FormSelect
                        name={`${propsName}.code`}
                        label="Localidad"
                        options={districtLocalities}
                        onChangeHandler={onChangeLocality}
                        showEmptyOption={true}
                        disabled={district === ""}
                    />
                )}
            </Grid>
            <Grid item xs={12} md={orientation === "vertical" ? 12 : 2}>
                <FormCheckbox
                    name={`${propsName}.non_existent`}
                    label="No existe"
                    disabled={district === ""}
                    onChangeHandler={onChangeNonExistent}
                />
            </Grid>
        </Grid>
    );
};

export default FormLocationSelect;
