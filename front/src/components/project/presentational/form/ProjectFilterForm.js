import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {
    ContractService,
    FinancingService,
    LocationService,
    TEMPLATE,
} from "service/api";

import {FormAutocomplete} from "components/common/form";
import {ClosedProjectsSwitch, ShowNoOfProjects} from "..";
import {SearchBoxControlled} from "components/common/presentational";

import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";

const ProjectFilterForm = ({
    filter,
    filteredNumber,
    onChange = null,
    onClear = null,
}) => {
    const [expanded, setExpanded] = useState(() => {
        return (
            filter?.status === "all" ||
            filter?.financing_program ||
            filter?.construction_contract ||
            filter?.department ||
            filter?.district
        );
    });

    const toggleAccordion = () => {
        setExpanded(oldExpanded => !oldExpanded);
    };

    const [loadedDomains, setLoadedDomains] = useState(false);
    const [financingPrograms, setFinancingPrograms] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [departmentDistricts, setDepartmentDistricts] = useState([]);

    useEffect(() => {
        if (expanded && !loadedDomains) {
            Promise.all([
                ContractService.getContracts(false, TEMPLATE.SHORT),
                LocationService.getAdministrativeDivisions(),
                FinancingService.getFinancingPrograms(),
            ]).then(([contracts, administrativeDivisions, financingPrograms]) => {
                setContracts(contracts);
                const {departments, districts} = administrativeDivisions;
                setDepartments(departments);
                setDistricts(districts);
                setFinancingPrograms(financingPrograms);
                setLoadedDomains(true);
            });
        }
    }, [expanded]);

    const formMethods = useForm({
        defaultValues: {
            status: filter?.status || "active",
            searchText: filter?.searchText || "",
            switchStatus: filter?.status === "all",
            financing_program: filter?.financing_program || "",
            construction_contract: filter?.construction_contract || "",
            department: filter?.department || "",
            district: filter?.district || "",
        },
    });

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

    const handleClearAllFilters = () => {
        formMethods.reset({
            status: "active",
            switchStatus: false,
            searchText: "",
            financing_program: "",
            construction_contract: "",
            department: "",
            district: "",
        });
        if (onClear) {
            handleChangeDepartment();
            onClear();
        }
    };

    const filterBtnStyle = {
        color: "text.secondary",
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
                            sx={filterBtnStyle}
                        >
                            {!expanded ? "Más filtros" : "Ocultar filtros"}
                        </Button>
                    </Grid>
                    <Grid item>
                        <ShowNoOfProjects numberOfProjects={filteredNumber} />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Collapse in={expanded} timeout="auto">
                        <Grid container spacing={2} alignItems="center" mb={2}>
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
                            <Grid item xs={4}>
                                <FormAutocomplete
                                    name="district"
                                    label="Distrito"
                                    options={departmentDistricts}
                                    optionIdAttribute="value"
                                    optionLabelAttribute="label"
                                    onChangeHandler={option =>
                                        onChange(
                                            "district",
                                            option ? option.value : null
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <ClosedProjectsSwitch
                                    onChangeHandler={value => onChange("status", value)}
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
                            <Grid item container xs pb={2}>
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

export default ProjectFilterForm;
