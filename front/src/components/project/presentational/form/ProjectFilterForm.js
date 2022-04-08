import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {ContractService, TEMPLATE} from "service/api";

import {useAdministrativeDivisions} from "components/common/provider";
import {FormSelectMultipleChip} from "components/common/form";
import {ClosedProjectsOption} from "..";
import {
    AccordionUndercoverLayout,
    SearchBoxControlled,
} from "components/common/presentational";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";

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
            searchText: "",
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
            searchText: "",
        });
    };

    return (
        <FormProvider {...formMethods}>
            <SearchBoxControlled name="searchText" />

            {/* ------> TO-DO: CHANGE POSITION OF ACCORDION TITLE+ICON */}
            <AccordionUndercoverLayout
                accordionTitle="Filtros"
                accordionIcon={<FilterListIcon />}
            >
                <Grid container columnSpacing={2} my={2}>
                    <Grid item xs={4}>
                        <FormSelectMultipleChip
                            name="department"
                            label="Departamento"
                            options={departments}
                            onChangeHandler={handleChangeDepartment}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormSelectMultipleChip
                            name="district"
                            label="Distrito"
                            options={departmentDistricts}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormSelectMultipleChip
                            name="construction_contract"
                            label="Contrato"
                            options={contracts}
                        />
                    </Grid>
                    <Grid item container xs={12} justifyContent="space-between">
                        <Grid item container xs={2} mt={2}>
                            <ClosedProjectsOption name="showClosedProjects" />
                        </Grid>
                        <Grid item container xs={2} mt={2}>
                            <Button
                                color="primary"
                                fullWidth
                                onClick={handleClearAllFilters}
                                sx={{lineHeight: 1}}
                            >
                                <ClearIcon /> Borrar filtros
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </AccordionUndercoverLayout>
        </FormProvider>
    );
};

export default ProjectFilterForm;
