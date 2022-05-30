import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {
    ContractorService,
    FinancingService,
    LocationService,
    ContractService,
    ProviderService,
    TEMPLATE,
} from "service/api";

import {FormAutocomplete, FormDatePicker, FormSelect} from "components/common/form";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import Collapse from "@mui/material/Collapse";

const StatsFilterForm = ({
    filter,
    views = [
        "financingFunds",
        "financingPrograms",
        "contracts",
        "contractors",
        "administrativeDivisions",
        "providers",
        "dates",
    ],
    onChange = null,
    onClear = null,
}) => {
    const [expanded, setExpanded] = useState(() => {
        return (
            Object.keys(filter).length != 0 &&
            (filter?.department !== "" &&
                filter?.district !== "" &&
                filter?.construction_contract !== "")
        );
    });

    const toggleAccordion = () => {
        setExpanded(oldExpanded => !oldExpanded);
    };

    const [loadedDomains, setLoadedDomains] = useState(false);

    const [financingFunds, setFinancingFunds] = useState([]);
    const [financingPrograms, setFinancingPrograms] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [contractors, setContractors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [departmentDistricts, setDepartmentDistricts] = useState([]);
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        if (expanded && !loadedDomains) {
            Promise.all([
                views.includes("financingFunds")
                    ? FinancingService.getFinancingFunds()
                    : null,
                views.includes("financingPrograms")
                    ? FinancingService.getFinancingPrograms()
                    : null,
                views.includes("contracts")
                    ? ContractService.getContracts(false, TEMPLATE.SHORT)
                    : null,
                views.includes("contractors")
                    ? ContractorService.getContractors()
                    : null,
                views.includes("administrativeDivisions")
                    ? LocationService.getAdministrativeDivisions()
                    : null,
                views.includes("providers") ? ProviderService.getProviders() : null,
            ]).then(
                ([
                    financingFunds,
                    financingPrograms,
                    contracts,
                    contractors,
                    administrativeDivisions,
                    providers,
                ]) => {
                    console.log({contractors});
                    setFinancingFunds(financingFunds);
                    setFinancingPrograms(financingPrograms);
                    setContracts(contracts);
                    setContractors(contractors);
                    const {departments, districts} = administrativeDivisions;
                    setDepartments(departments);
                    setDistricts(districts);
                    setProviders(providers);
                    setLoadedDomains(true);
                }
            );
        }
    }, [expanded]);

    const formMethods = useForm({
        defaultValues: {
            financing_fund: filter?.financing_fund || "",
            financing_program: filter?.financing_program || "",
            construction_contract: filter?.construction_contract || "",
            contractor: filter?.contractor || "",
            department: filter?.department || "",
            district: filter?.district || "",
            provider: filter?.provider || "",
            month_from: filter?.month_from || null,
            month_to: filter?.month_to || null,
        },
    });

    const handleChangeDepartment = selectedDepartment => {
        setDepartmentDistricts(
            districts.filter(
                district => district.department_code === selectedDepartment.value
            )
        );
        const values = formMethods.getValues();
        values["district"] = "";
        formMethods.reset({
            ...values,
        });
        onChange("department", selectedDepartment.value);
    };

    const handleChangeMonth = (field, value) => {
        onChange(
            field,
            value ? `${value.getFullYear()}/${value.getMonth() + 1}` : null
        );
    };

    const handleClearAllFilters = () => {
        formMethods.reset({
            financing_fund: "",
            financing_program: "",
            contract: "",
            contractor: "",
            department: "",
            district: "",
            provider: "",
            month_from: null,
            month_to: null,
        });
        if (onClear) {
            onClear();
        }
    };

    return (
        <FormProvider {...formMethods}>
            <Grid
                container
                sx={{
                    mb: 3,
                }}
                spacing={2}
            >
                <Grid item container spacing={2} xs={12}>
                    <Grid item xs>
                        <Button
                            onClick={toggleAccordion}
                            sx={{color: "text.secondary"}}
                            startIcon={<FilterListIcon />}
                        >
                            Ver Filtros
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Collapse in={expanded} timeout="auto">
                        <Grid
                            container
                            columnSpacing={2}
                            rowSpacing={2}
                            alignItems="center"
                        >
                            {views.includes("financingFunds") && (
                                <Grid item xs={4}>
                                    <FormAutocomplete
                                        name="financing_fund"
                                        label="Fondo de financiación"
                                        options={financingFunds}
                                        optionLabelAttribute="short_name"
                                        onChangeHandler={option =>
                                            onChange(
                                                "financing_fund",
                                                option ? option.id : null
                                            )
                                        }
                                    />
                                </Grid>
                            )}
                            {views.includes("financingPrograms") && (
                                <Grid item xs={4}>
                                    <FormAutocomplete
                                        name="financing_program"
                                        label="Programa de financiación"
                                        options={financingPrograms}
                                        optionLabelAttribute="short_name"
                                        onChangeHandler={option =>
                                            onChange(
                                                "financing_program",
                                                option ? option.id : null
                                            )
                                        }
                                    />
                                </Grid>
                            )}
                            {views.includes("contracts") && (
                                <Grid item xs={4}>
                                    <FormAutocomplete
                                        name="construction_contract"
                                        label="Contrato"
                                        options={contracts}
                                        optionLabelAttribute="number"
                                        onChangeHandler={option =>
                                            onChange(
                                                "construction_contract",
                                                option ? option.id : null
                                            )
                                        }
                                    />
                                </Grid>
                            )}
                            {views.includes("contractors") && (
                                <Grid item xs={4}>
                                    <FormAutocomplete
                                        name="contractor"
                                        label="Contratista"
                                        options={contractors}
                                        onChangeHandler={option =>
                                            onChange(
                                                "contractor",
                                                option ? option.id : null
                                            )
                                        }
                                    />
                                </Grid>
                            )}
                            {views.includes("administrativeDivisions") && (
                                <Grid item xs={4}>
                                    <FormAutocomplete
                                        name="department"
                                        label="Departamento"
                                        options={departments}
                                        optionIdAttribute="value"
                                        optionLabelAttribute="label"
                                        onChangeHandler={handleChangeDepartment}
                                    />
                                </Grid>
                            )}
                            {views.includes("administrativeDivisions") && (
                                <Grid item xs={4}>
                                    <FormAutocomplete
                                        name="district"
                                        label="Distrito"
                                        options={departmentDistricts}
                                        optionIdAttribute="value"
                                        optionLabelAttribute="label"
                                        onChangeHandler={option =>
                                            onChange("district", option.value)
                                        }
                                    />
                                </Grid>
                            )}
                            {views.includes("providers") && (
                                <Grid item xs={4}>
                                    <FormAutocomplete
                                        name="provider"
                                        label="Prestador"
                                        options={providers}
                                        onChangeHandler={option =>
                                            onChange(
                                                "provider",
                                                option ? option.id : null
                                            )
                                        }
                                    />
                                </Grid>
                            )}
                            {views.includes("dates") && (
                                <Grid item xs={4}>
                                    <FormDatePicker
                                        name="month_from"
                                        label="Desde el mes"
                                        views={["month", "year"]}
                                        onChangeHandler={option =>
                                            handleChangeMonth("month_from", option)
                                        }
                                    />
                                </Grid>
                            )}
                            {views.includes("dates") && (
                                <Grid item xs={4}>
                                    <FormDatePicker
                                        name="month_to"
                                        label="Hasta el mes"
                                        views={["month", "year"]}
                                        onChangeHandler={option =>
                                            handleChangeMonth("month_to", option)
                                        }
                                    />
                                </Grid>
                            )}
                            <Grid item xs={4} container justifyContent="flex-end">
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
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default StatsFilterForm;
