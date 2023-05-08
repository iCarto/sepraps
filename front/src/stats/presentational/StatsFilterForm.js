import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

import {ContractService, TEMPLATE} from "contract/service";
import {ProviderService} from "provider/service";
import {ContractorService} from "contractor/service";
import {FinancingService} from "financing/service";
import {LocationService} from "sepraps/location/service";

import {FormAutocomplete, FormClearButton, FormDatePicker} from "base/form/components";
import {ToggleFilterAccordionButton} from "base/shared/components";

import Grid from "@mui/material/Grid";
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
            Object.keys(filter).length &&
            filter?.department !== "" &&
            filter?.district !== "" &&
            filter?.construction_contract !== ""
        );
    });

    const [loadedDomains, setLoadedDomains] = useState(false);
    const [financingFunds, setFinancingFunds] = useState([]);
    const [financingPrograms, setFinancingPrograms] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [contractors, setContractors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [departmentDistricts, setDepartmentDistricts] = useState([]);
    const [providers, setProviders] = useState([]);

    const toggleAccordion = () => {
        setExpanded(oldExpanded => !oldExpanded);
    };

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
                    ? ContractService.getAll(false, TEMPLATE.SHORT)
                    : null,
                views.includes("contractors")
                    ? ContractorService.getContractors()
                    : null,
                views.includes("administrativeDivisions")
                    ? LocationService.getAdministrativeDivisions()
                    : null,
                views.includes("providers") ? ProviderService.getAll() : null,
            ]).then(
                ([
                    financingFunds,
                    financingPrograms,
                    contracts,
                    contractors,
                    administrativeDivisions,
                    providers,
                ]) => {
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

    const handleClearAllFilters = () => {
        formMethods.reset({
            financing_fund: "",
            financing_program: "",
            construction_contract: "",
            contractor: "",
            department: "",
            district: "",
            provider: "",
            month_from: null,
            month_to: null,
        });
        if (onClear) {
            onClear();
            handleChangeDepartment();
        }
    };

    const handleChangeDepartment = selectedDepartment => {
        if (selectedDepartment) {
            setDepartmentDistricts(
                districts.filter(
                    district => district.department_code === selectedDepartment.value
                )
            );
        } else setDepartmentDistricts([]);
        const values = formMethods.getValues();
        values["district"] = "";
        formMethods.reset({
            ...values,
        });

        onChange("department", selectedDepartment ? selectedDepartment.value : null);
    };

    const handleChangeMonth = (field, value) => {
        onChange(
            field,
            value ? `${value.getFullYear()}/${value.getMonth() + 1}` : null
        );
    };

    return (
        <FormProvider {...formMethods}>
            <ToggleFilterAccordionButton
                clickHandler={toggleAccordion}
                isExpanded={expanded}
            />

            <Collapse in={expanded} timeout="auto" sx={{width: "100%"}}>
                <Grid
                    container
                    component="form"
                    columnSpacing={1}
                    alignItems="center"
                    mb={3}
                >
                    {views.includes("financingFunds") && (
                        <Grid item xs={4} lg={3}>
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
                        <Grid item xs={4} lg={3}>
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
                        <Grid item xs={4} lg={3}>
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
                        <Grid item xs={4} lg={3}>
                            <FormAutocomplete
                                name="contractor"
                                label="Contratista"
                                options={contractors}
                                onChangeHandler={option =>
                                    onChange("contractor", option ? option.id : null)
                                }
                            />
                        </Grid>
                    )}
                    {views.includes("providers") && (
                        <Grid
                            item
                            lg={3}
                            sx={{display: {xs: "none", lg: "inherit"}}}
                        ></Grid>
                    )}
                    {views.includes("administrativeDivisions") && (
                        <Grid item xs={4} lg={3}>
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
                        <Grid item xs={4} lg={3}>
                            <FormAutocomplete
                                name="district"
                                label="Distrito"
                                options={departmentDistricts}
                                optionIdAttribute="value"
                                optionLabelAttribute="label"
                                onChangeHandler={option =>
                                    onChange("district", option ? option.value : null)
                                }
                            />
                        </Grid>
                    )}
                    {views.includes("providers") && (
                        <Grid item xs={4} lg={3}>
                            <FormAutocomplete
                                name="provider"
                                label="Prestador"
                                options={providers}
                                onChangeHandler={option =>
                                    onChange("provider", option ? option.id : null)
                                }
                            />
                        </Grid>
                    )}
                    {views.includes("dates") && (
                        <Grid item xs={4} lg={3}>
                            <FormDatePicker
                                name="month_from"
                                label="Desde el mes"
                                views={["month", "year"]}
                                margin="0"
                                onChangeHandler={option =>
                                    handleChangeMonth("month_from", option)
                                }
                            />
                        </Grid>
                    )}
                    {views.includes("dates") && (
                        <Grid item xs={4} lg={3}>
                            <FormDatePicker
                                name="month_to"
                                label="Hasta el mes"
                                views={["month", "year"]}
                                margin="0"
                                onChangeHandler={option =>
                                    handleChangeMonth("month_to", option)
                                }
                            />
                        </Grid>
                    )}
                    <Grid item xs>
                        <FormClearButton handleClear={handleClearAllFilters} />
                    </Grid>
                </Grid>
            </Collapse>
        </FormProvider>
    );
};

export default StatsFilterForm;
