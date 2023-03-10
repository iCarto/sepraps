import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {ContractorService, FinancingService} from "service/api";

import {FormAutocomplete, FormDatePicker} from "components/common/form";
import {SearchBoxControlled} from "components/common/presentational";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";

const ContractFilterForm = ({
    filter,
    filteredNumber,
    onChange = null,
    onClear = null,
}) => {
    const [expanded, setExpanded] = useState(() => {
        return (
            Object.keys(filter).length !== 0 &&
            filter?.department !== "" &&
            filter?.district !== "" &&
            filter?.construction_contract !== ""
        );
    });

    const toggleAccordion = () => {
        setExpanded(oldExpanded => !oldExpanded);
    };

    const [loadedDomains, setLoadedDomains] = useState(false);

    const [financingFunds, setFinancingFunds] = useState([]);
    const [financingPrograms, setFinancingPrograms] = useState([]);
    const [contractors, setContractors] = useState([]);

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
    }, [expanded]);

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
    };

    return (
        <FormProvider {...formMethods}>
            <Grid container spacing={2} mb={3}>
                <Grid item container component="form" spacing={2} xs={12}>
                    <Grid item>
                        <SearchBoxControlled
                            name="searchText"
                            onChangeHandler={value => onChange("searchText", value)}
                        />
                    </Grid>
                    <Grid item xs>
                        <Button
                            onClick={toggleAccordion}
                            startIcon={<FilterListIcon />}
                            sx={{color: "text.secondary"}}
                        >
                            {!expanded ? "M??s filtros" : "Ocultar filtros"}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                px: 1,
                                border: 1,
                                borderRadius: 1,
                                color: "grey.700",
                                textTransform: "uppercase",
                            }}
                        >
                            <Typography
                                component="span"
                                variant="h4"
                                sx={{
                                    mr: 1,
                                }}
                            >
                                {filteredNumber}
                            </Typography>
                            <Typography variant="body1">contratos</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Collapse in={expanded} timeout="auto">
                        <Grid
                            container
                            columnSpacing={2}
                            component="form"
                            alignItems="center"
                            mb={2}
                        >
                            <Grid item xs={4}>
                                <FormAutocomplete
                                    name="financing_fund"
                                    label="Fondo de financiaci??n"
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
                            <Grid item xs={4}>
                                <FormAutocomplete
                                    name="financing_program"
                                    label="Programa de financiaci??n"
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
                            <Grid item xs={4}>
                                <FormDatePicker
                                    name="awarding_date_min"
                                    label="Fecha adj. mayor que"
                                    onChangeHandler={date =>
                                        onChange("awarding_date_min", date)
                                    }
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormDatePicker
                                    name="awarding_date_max"
                                    label="Fecha adj. menor que"
                                    onChangeHandler={date =>
                                        onChange("awarding_date_max", date)
                                    }
                                />
                            </Grid>
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

export default ContractFilterForm;
