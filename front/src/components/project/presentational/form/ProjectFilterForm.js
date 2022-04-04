import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {ContractService, TEMPLATE} from "service/api";

import {useAdministrativeDivisions} from "components/common/provider";
import {FormSelectMultipleChip} from "components/common/form";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ProjectFilterForm = ({onChange = null}) => {
    const [contracts, setContracts] = useState([]);
    const {departments, districts} = useAdministrativeDivisions();
    const [departmentDistricts, setDepartmentDistricts] = useState([]);

    useEffect(() => {
        ContractService.getContracts(false, TEMPLATE.SHORT).then(contracts => {
            setContracts(
                contracts.map(contract => {
                    return {value: contract.id, label: contract.number};
                })
            );
        });
    }, []);

    const formMethods = useForm({
        defaultValues: {
            department: "",
            district: "",
            construction_contract: "",
        },
    });

    const handleChange = value => {
        onChange(formMethods.getValues());
    };

    const handleChangeDepartment = selectedDepartment => {
        setDepartmentDistricts(
            districts.filter(
                district => district.department_code === selectedDepartment
            )
        );
        const values = formMethods.getValues();
        values["district"] = "";
        formMethods.reset({
            ...values,
        });
        onChange(values);
    };

    const handleClearAllFilters = () => {
        formMethods.reset({
            department: "",
            district: "",
            construction_contract: "",
        });
    };

    return (
        <FormProvider {...formMethods}>
            <Grid container columnSpacing={2} my={2}>
                <Grid item xs={3.5}>
                    <FormSelectMultipleChip
                        name="department"
                        label="Departamento"
                        options={departments}
                        onChangeHandler={handleChangeDepartment}
                    />
                </Grid>
                <Grid item xs={3.5}>
                    <FormSelectMultipleChip
                        name="district"
                        label="Distrito"
                        options={departmentDistricts}
                        onChangeHandler={handleChange}
                    />
                </Grid>
                <Grid item xs={3.5}>
                    <FormSelectMultipleChip
                        name="construction_contract"
                        label="Contrato"
                        options={contracts}
                        onChangeHandler={handleChange}
                    />
                </Grid>
                <Grid item container xs>
                    <Button color="primary" fullWidth onClick={handleClearAllFilters}>
                        Borrar
                    </Button>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default ProjectFilterForm;
