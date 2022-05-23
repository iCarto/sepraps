import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {
    ContractService,
    FinancingService,
    LocationService,
    TEMPLATE,
} from "service/api";

import {FormAutocomplete, FormSelect} from "components/common/form";
import {ClosedProjectsSwitch, ShowNoOfProjects} from "..";
import {SearchBoxControlled} from "components/common/presentational";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import Collapse from "@mui/material/Collapse";

const ProjectFilterForm = ({
    filter,
    filteredNumber,
    onChange = null,
    onClear = null,
}) => {
    const [expanded, setExpanded] = useState(() => {
        return (
            filter?.status === "all" ||
            filter?.department ||
            filter?.district ||
            filter?.construction_contract ||
            filter?.financing_program
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
    const [financingPrograms, setFinancingPrograms] = useState([]);

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
            department: filter?.department || "",
            district: filter?.district || "",
            construction_contract: filter?.construction_contract || "",
            financing_program: filter?.financing_program || "",
            status: filter?.status || "active",
            switchStatus: filter?.status === "all",
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
            financing_program: "",
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
                        <ShowNoOfProjects numberOfProjects={filteredNumber} />
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
                            <Grid item xs />
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
                            <Grid item xs />
                            <Grid item xs={4}>
                                <ClosedProjectsSwitch
                                    onChangeHandler={value => onChange("status", value)}
                                />
                            </Grid>
                            <Grid item xs={4} container justifyContent="flex-end">
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

export default ProjectFilterForm;
