import {useCallback, useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {FinancingService} from "financing/service";
import {ContractService, TEMPLATE} from "contract/service";
import {LocationService} from "sepraps/location/service";

import {useList} from "base/entity/hooks";
import {EntityCounter} from "base/entity/components/presentational";
import {SearchBox} from "base/search/components";
import {FormAutocomplete, FormClearButton} from "base/form/components";
import {ClosedProjectsSwitch} from "..";
import {ToggleFilterAccordionButton} from "base/shared/components";

import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";

const ProjectFilterForm = ({onClear = null}) => {
    const {filter, setFilter, setPage, size} = useList();
    const isFilterEmpty =
        filter?.status !== "all" &&
        !filter?.searchText &&
        !filter?.financing_program &&
        !filter?.construction_contract &&
        !filter?.department &&
        !filter?.district;

    const [loadedDomains, setLoadedDomains] = useState(false);
    const [financingPrograms, setFinancingPrograms] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [departmentDistricts, setDepartmentDistricts] = useState([]);
    const [expanded, setExpanded] = useState(() => {
        return !isFilterEmpty;
    });

    const toggleAccordion = () => {
        setExpanded(oldExpanded => !oldExpanded);
    };

    useEffect(() => {
        if (expanded && !loadedDomains) {
            Promise.all([
                ContractService.getAll(false, 1),
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
    }, [expanded, loadedDomains]);

    const formMethods = useForm({
        defaultValues: {
            status: filter?.status || "active",
            searchText: filter?.search || "",
            switchStatus: filter?.status === "all",
            financing_program: filter?.financing_program || "",
            construction_contract: filter?.construction_contract || "",
            department: filter?.department || "",
            district: filter?.district || "",
        },
    });

    const handleChange = useCallback(
        attributeValue => {
            setPage(1);
            setFilter({...filter, ...attributeValue});
        },
        [filter, setFilter, setPage]
    );

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
        handleChange({
            department: selectedDepartment ? selectedDepartment.value : null,
        });
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
                    <EntityCounter size={size} entityName={"proyectos"} />
                </Grid>
            </Grid>

            <Collapse in={expanded} timeout="auto" sx={{width: "100%"}}>
                <Grid container columnSpacing={1} alignItems="center" sx={{mt: "0px"}}>
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
                                handleChange({
                                    district: option ? option.value : null,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ClosedProjectsSwitch
                            onChangeHandler={value => handleChange({status: value})}
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
                            name="construction_contract"
                            label="Contrato"
                            options={contracts}
                            optionLabelAttribute="number"
                            onChangeHandler={option =>
                                handleChange({
                                    construction_contract: option ? option.id : null,
                                })
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

export default ProjectFilterForm;
