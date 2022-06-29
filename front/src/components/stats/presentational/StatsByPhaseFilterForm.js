import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {ContractService, FinancingService, TEMPLATE} from "service/api";
import {useAdministrativeDivisions} from "components/common/provider";
import {FormSelect} from "components/common/form";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";

const StatsByPhaseFilterForm = ({onChange = null, onClear = null}) => {
    const [financingFunds, setFinancingFunds] = useState([]);
    const [financingPrograms, setFinancingPrograms] = useState([]);
    const [contracts, setContracts] = useState([]);
    const {departments, districts} = useAdministrativeDivisions();
    const [departmentDistricts, setDepartmentDistricts] = useState([]);
    const [loadedDomains, setLoadedDomains] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const toggleAccordion = () => {
        setExpanded(oldExpanded => !oldExpanded);
    };

    const formMethods = useForm({
        defaultValues: {
            financing_fund: "",
            financing_program: "",
            construction_contract: "",
            department: "",
            district: "",
        },
    });

    useEffect(() => {
        if (expanded && !loadedDomains) {
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
                        return {
                            value: financingFund.id,
                            label: financingFund.short_name,
                        };
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
                setLoadedDomains(true);
            });
        }
    }, [expanded]);

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
            financing_fund: "",
            financing_program: "",
            construction_contract: "",
            department: "",
            district: "",
        });
        if (onClear) {
            onClear();
        }
    };

    const filterBtnStyle = {
        color: "text.secondary",
        width: "fit-content",
    };

    return (
        <FormProvider {...formMethods}>
            <Button
                onClick={toggleAccordion}
                startIcon={<FilterListIcon />}
                sx={filterBtnStyle}
            >
                {!expanded ? "Ver filtros" : "Ocultar filtros"}
            </Button>
            <Collapse in={expanded} timeout="auto">
                <Grid container component="form" spacing={2} alignItems="center" mb={3}>
                    <Grid item xs={4}>
                        <FormSelect
                            name="financing_fund"
                            label="Fondo de financiación"
                            options={financingFunds}
                            onChangeHandler={handleChange}
                            showEmptyOption={true}
                            margin="0"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormSelect
                            name="financing_program"
                            label="Programa de financiación"
                            options={financingPrograms}
                            onChangeHandler={handleChange}
                            showEmptyOption={true}
                            margin="0"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormSelect
                            name="construction_contract"
                            label="Contrato"
                            options={contracts}
                            onChangeHandler={handleChange}
                            showEmptyOption={true}
                            margin="0"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormSelect
                            name="department"
                            label="Departamento"
                            options={departments}
                            onChangeHandler={handleChangeDepartment}
                            showEmptyOption={true}
                            margin="0"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormSelect
                            name="district"
                            label="Distrito"
                            options={departmentDistricts}
                            onChangeHandler={handleChange}
                            showEmptyOption={true}
                            margin="0"
                        />
                    </Grid>
                    <Grid item xs container justifyContent="flex-end" mb={3}>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={handleClearAllFilters}
                        >
                            <ClearIcon /> Borrar filtros
                        </Button>
                    </Grid>
                </Grid>
            </Collapse>
        </FormProvider>
    );
};

export default StatsByPhaseFilterForm;
