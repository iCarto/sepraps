import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {ContractService, FinancingService, TEMPLATE} from "service/api";
import {useAdministrativeDivisions, useDomain} from "components/common/provider";
import Grid from "@mui/material/Grid";
import {FormSelect} from "components/common/form";
import {AccordionLayout} from "components/common/presentational";
import FilterListIcon from "@mui/icons-material/FilterList";

const StatsByPhaseFilter = ({onChange = null}) => {
    const [contracts, setContracts] = useState([]);
    const [financingFunds, setFinancingFunds] = useState([]);
    const [financingPrograms, setFinancingPrograms] = useState([]);
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
        Promise.all([
            ContractService.getContracts(false, TEMPLATE.SHORT),
            FinancingService.getFinancingFunds(),
            FinancingService.getFinancingPrograms(),
        ]).then(([contracts, financingFunds, financingPrograms]) => {
            setContracts(
                contracts.map(contract => {
                    return {value: contract.id, label: contract.number};
                })
            );
            setFinancingFunds(
                financingFunds.map(financingFund => {
                    return {value: financingFund.id, label: financingFund.short_name};
                })
            );
            setFinancingPrograms(
                financingPrograms.map(financingProgram => {
                    return {
                        value: financingProgram.id,
                        label: financingProgram.short_name,
                    };
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
                            name="financing_fund"
                            label="Fondo de financiación"
                            options={financingFunds}
                            onChangeHandler={handleChange}
                            showEmptyOption={true}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormSelect
                            name="financing_program"
                            label="Programa de financiación"
                            options={financingPrograms}
                            onChangeHandler={handleChange}
                            showEmptyOption={true}
                        />
                    </Grid>
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
                </Grid>
            </AccordionLayout>
        </FormProvider>
    );
};

export default StatsByPhaseFilter;
