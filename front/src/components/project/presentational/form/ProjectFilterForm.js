import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {ContractService, TEMPLATE} from "service/api";

import {useAdministrativeDivisions} from "components/common/provider";
import {FormSelectMultipleChip} from "components/common/form";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import {ClosedProjectsOption} from "..";

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
            showClosedProjects: false,
        },
    });

    useEffect(() => {
        const subscription = formMethods.watch(() => onChange(formMethods.getValues()));
        return () => subscription.unsubscribe();
    }, [formMethods.watch]);

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
            showClosedProjects: false,
        });
    };

    return (
        <FormProvider {...formMethods}>
            <Grid container columnSpacing={2} my={2}>
                <Grid item xs={3}>
                    <FormSelectMultipleChip
                        name="department"
                        label="Departamento"
                        options={departments}
                        onChangeHandler={handleChangeDepartment}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormSelectMultipleChip
                        name="district"
                        label="Distrito"
                        options={departmentDistricts}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormSelectMultipleChip
                        name="construction_contract"
                        label="Contrato"
                        options={contracts}
                    />
                </Grid>
                <Grid item container xs={1.5}>
                    <ClosedProjectsOption name="showClosedProjects" />
                </Grid>

                <Grid item container xs={1.5}>
                    <Button color="primary" fullWidth onClick={handleClearAllFilters}>
                        <ClearIcon /> Borrar
                    </Button>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default ProjectFilterForm;
