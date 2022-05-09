import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {ContractService, LocationService, TEMPLATE} from "service/api";

import {FormSelect} from "components/common/form";
import {SearchBoxControlled} from "components/common/presentational";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import Stack from "@mui/material/Stack";
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
    const [contracts, setContracts] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [departmentDistricts, setDepartmentDistricts] = useState([]);

    useEffect(() => {
        if (expanded && !loadedDomains) {
            Promise.all([
                ContractService.getContracts(false, TEMPLATE.SHORT),
                LocationService.getAdministrativeDivisions(),
            ]).then(([contracts, administrativeDivisions]) => {
                setContracts(
                    contracts.map(contract => {
                        return {value: contract.id, label: contract.number};
                    })
                );
                const {departments, districts} = administrativeDivisions;
                setDepartments(departments);
                setDistricts(districts);
                setLoadedDomains(true);
            });
        }
    }, [expanded]);

    const formMethods = useForm({
        defaultValues: {
            department: filter?.department || "",
            district: filter?.district || "",
            construction_contract: filter?.construction_contract || "",
            status: filter?.status || "active",
            switchStatus: filter?.switchStatus || false,
            searchText: filter?.searchText || "",
        },
    });

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
        onChange("department", selectedDepartment);
    };

    const handleClearAllFilters = () => {
        formMethods.reset({
            department: "",
            district: "",
            construction_contract: "",
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
                        <Grid container columnSpacing={2}>
                            <Grid item xs={4}>
                                <FormSelect
                                    name="construction_contract"
                                    label="Contrato"
                                    options={contracts}
                                    showEmptyOption={true}
                                    onChangeHandler={value =>
                                        onChange("construction_contract", value)
                                    }
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
                                    onChangeHandler={value =>
                                        onChange("district", value)
                                    }
                                    showEmptyOption={true}
                                />
                            </Grid>
                            <Grid item container xs justifyContent="space-between">
                                <Button
                                    color="primary"
                                    variant="outlined"
                                    onClick={handleClearAllFilters}
                                    sx={{lineHeight: 1}}
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
