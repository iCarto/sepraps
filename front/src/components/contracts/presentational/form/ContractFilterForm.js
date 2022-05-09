import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {
    ContractorService,
    ContractService,
    FinancingService,
    LocationService,
    TEMPLATE,
} from "service/api";

import {FormAutocomplete, FormDatePicker, FormSelect} from "components/common/form";
import {SearchBoxControlled} from "components/common/presentational";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ContractFilterForm = ({
    filter,
    filteredNumber,
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
            <Grid
                container
                sx={{
                    mb: 3,
                }}
                spacing={2}
            >
                <Grid item container spacing={2} xs={12}>
                    <Grid item>
                        <SearchBoxControlled
                            name="searchText"
                            onChangeHandler={value => onChange("searchText", value)}
                        />
                    </Grid>
                    <Grid item xs>
                        <Button
                            onClick={toggleAccordion}
                            sx={{color: "text.secondary"}}
                            startIcon={<FilterListIcon />}
                        >
                            Más Filtros
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
                            rowSpacing={2}
                            alignItems="center"
                        >
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
                            <Grid item xs={4}>
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
