import {useCallback, useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {FinancingService} from "financing/service";
import {ContractorService} from "contractor/service";

import {useList} from "base/entity/hooks";
import {EntityCounter} from "base/entity/components";
import {SearchBox} from "base/search/components";
import {FormAutocomplete, FormDatePicker, FormClearButton} from "base/form/components";
import {ToggleFilterAccordionButton} from "base/shared/components";

import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";

const ContractFilterForm = ({onClear = null}) => {
    const {filter, setFilter, setPage, size} = useList();
    const isFilterEmpty =
        !filter?.searchText &&
        !filter?.financing_fund &&
        !filter?.financing_program &&
        !filter?.contractor &&
        !filter?.awarding_date_min &&
        !filter?.awarding_date_max;

    const [loadedDomains, setLoadedDomains] = useState(false);
    const [financingFunds, setFinancingFunds] = useState([]);
    const [financingPrograms, setFinancingPrograms] = useState([]);
    const [contractors, setContractors] = useState([]);
    const [expanded, setExpanded] = useState(() => {
        return !isFilterEmpty;
    });

    const toggleAccordion = () => {
        setExpanded(oldExpanded => !oldExpanded);
    };

    useEffect(() => {
        if (expanded && !loadedDomains) {
            Promise.all([
                FinancingService.getFinancingFunds(),
                FinancingService.getFinancingPrograms(),
                ContractorService.getContractors(),
            ]).then(([financingFunds, financingPrograms, contractors]) => {
                setFinancingFunds(financingFunds);
                setFinancingPrograms(financingPrograms);
                setContractors(contractors);
                setLoadedDomains(true);
            });
        }
    }, [expanded, loadedDomains]);

    const formMethods = useForm({
        defaultValues: {
            financing_fund: filter?.financing_fund || "",
            financing_program: filter?.financing_program || "",
            contractor: filter?.contractor || "",
            awarding_date_min: filter?.awarding_date_min || null,
            awarding_date_max: filter?.awarding_date_max || null,
            status: filter?.status || "active",
            switchStatus: filter?.switchStatus || false,
            searchText: filter?.searchText || "",
        },
    });

    const handleChange = useCallback(
        attributeValue => {
            setPage(1);
            setFilter({...filter, ...attributeValue});
        },
        [filter, setFilter, setPage]
    );

    const handleClearAllFilters = () => {
        formMethods.reset({
            financing_fund: "",
            financing_program: "",
            contractor: "",
            awarding_date_min: null,
            awarding_date_max: null,
            status: "active",
            switchStatus: false,
            searchText: "",
        });
        if (onClear) {
            onClear();
        }
        setFilter({});
    };

    return (
        <FormProvider {...formMethods}>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <SearchBox
                        name="searchText"
                        onChangeHandler={value => handleChange({search: value})}
                    />
                </Grid>
                <Grid item xs={3}>
                    <ToggleFilterAccordionButton
                        clickHandler={toggleAccordion}
                        isExpanded={expanded}
                    />
                </Grid>
                <Grid item xs={5} md={4} xl={2}>
                    <EntityCounter size={size} entityName={"contratos"} />
                </Grid>
            </Grid>

            <Collapse in={expanded} timeout="auto" sx={{width: "100%"}}>
                <Grid container columnSpacing={1} alignItems="center" sx={{mt: "0px"}}>
                    <Grid item xs={4}>
                        <FormAutocomplete
                            name="financing_fund"
                            label="Fondo de financiación"
                            options={financingFunds}
                            optionLabelAttribute="short_name"
                            onChangeHandler={option =>
                                handleChange({
                                    financing_fund: option ? option.id : null,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormAutocomplete
                            name="financing_program"
                            label="Programa de financiación"
                            options={financingPrograms}
                            optionLabelAttribute="short_name"
                            onChangeHandler={option =>
                                handleChange({
                                    financing_program: option ? option.id : null,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormAutocomplete
                            name="contractor"
                            label="Contratista"
                            options={contractors}
                            onChangeHandler={option =>
                                handleChange({contractor: option ? option.id : null})
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormDatePicker
                            name="awarding_date_min"
                            label="Fecha adj. posterior a"
                            onChangeHandler={date =>
                                handleChange({awarding_date_min: date})
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormDatePicker
                            name="awarding_date_max"
                            label="Fecha adj. anterior a"
                            onChangeHandler={date =>
                                handleChange({awarding_date_max: date})
                            }
                        />
                    </Grid>

                    <Grid item xs>
                        <FormClearButton handleClear={handleClearAllFilters} />
                    </Grid>
                </Grid>
            </Collapse>
        </FormProvider>
    );
};

export default ContractFilterForm;
