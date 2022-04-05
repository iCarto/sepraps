import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {ContractService, TEMPLATE} from "service/api";
import {useAdministrativeDivisions, useDomain} from "components/common/provider";
import Grid from "@mui/material/Grid";
import {FormSelect} from "components/common/form";
import {AccordionLayout} from "components/common/presentational";
import FilterListIcon from "@mui/icons-material/FilterList";

const StatsByPhaseFilter = ({onChange = null}) => {
    const [contracts, setContracts] = useState([]);
    const {financingFunds, financingPrograms} = useDomain();
    const {departments, districts} = useAdministrativeDivisions();
    const [departmentDistricts, setDepartmentDistricts] = useState([]);

    const formMethods = useForm({
        defaultValues: {
            construction_contract: "",
            department: "",
            district: "",
            financing_fund: "",
            financing_program: "",
        },
    });

    useEffect(() => {
        ContractService.getContracts(false, TEMPLATE.SHORT).then(contracts => {
            setContracts(
                contracts.map(contract => {
                    return {value: contract.id, label: contract.number};
                })
            );
        });
    }, []);

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

    return (
        <FormProvider {...formMethods}>
            <AccordionLayout
                accordionTitle="Filtros"
                accordionIcon={<FilterListIcon />}
            >
                <Grid container component="form" spacing={2}>
                    <Grid item xs={4}>
                        <FormSelect
                            name="construction_contract"
                            label="Contrato"
                            options={contracts}
                            onChangeHandler={handleChange}
                            showEmptyOption={true}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormSelect
                            name="department"
                            label="Departamento"
                            options={departments}
                            onChangeHandler={handleChangeDepartment}
                            showEmptyOption={true}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormSelect
                            name="district"
                            label="Distrito"
                            options={departmentDistricts}
                            onChangeHandler={handleChange}
                            showEmptyOption={true}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormSelect
                            name="financing_fund"
                            label="Fondo de financiación"
                            options={financingFunds}
                            onChangeHandler={handleChange}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormSelect
                            name="financing_program"
                            label="Programa de financiación"
                            options={financingPrograms}
                            onChangeHandler={handleChange}
                        />
                    </Grid>
                </Grid>
            </AccordionLayout>
        </FormProvider>
    );
};

export default StatsByPhaseFilter;
