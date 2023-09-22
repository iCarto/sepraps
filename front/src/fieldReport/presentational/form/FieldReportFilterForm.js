import {useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";

import {ContractService, TEMPLATE} from "contract/service";
import {LocationService} from "sepraps/location/service";

import {
    FormAutocomplete,
    FormClearButton,
    FormDatePicker,
    FormSwitch,
} from "base/form/components";
import {ToggleFilterAccordionButton} from "base/shared/components";

import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import {useList} from "base/entity/hooks";
import {SearchBox} from "base/search/components";
import {EntityCounter} from "base/entity/components/presentational";

const FieldReportFilterForm = ({onClear = null}) => {
    const location = useLocation();
    const {filter, setFilter, setPage, size} = useList();

    const isFilterEmpty =
        !filter?.searchText &&
        !filter?.construction_contract &&
        !filter?.department &&
        !filter?.district;

    const [loadedDomains, setLoadedDomains] = useState(false);
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
                ContractService.getList({template: TEMPLATE.SHORT, closed: false}),
                LocationService.getAdministrativeDivisions(),
            ]).then(([contracts, administrativeDivisions]) => {
                console.log({contracts});
                setContracts(contracts);
                const {departments, districts} = administrativeDivisions;
                setDepartments(departments);
                setDistricts(districts);
                setLoadedDomains(true);
            });
        }
    }, [expanded, loadedDomains, location.state?.lastRefreshDate]);

    const formMethods = useForm({
        defaultValues: {
            searchText: filter?.search || "",
            creator_user: true,
            construction_contract: filter?.construction_contract || "",
            department: filter?.department || "",
            district: filter?.district || "",
            month_from: filter?.month_from || null,
            month_to: filter?.month_to || null,
        },
    });

    const handleClearAllFilters = () => {
        formMethods.reset({
            searchText: "",
            construction_contract: "",
            department: "",
            district: "",
            month_from: null,
            month_to: null,
        });
        if (onClear) {
            handleChangeDepartment();
            onClear();
        }
        setFilter({});
    };

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

    return (
        <FormProvider {...formMethods}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <SearchBox
                        name="searchText"
                        onChangeHandler={value => handleChange({search: value})}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormSwitch
                        label="Mis informes"
                        name="creator_user"
                        onChangeHandler={value =>
                            handleChange({creator_user: value.target.checked})
                        }
                    />
                </Grid>
                <Grid item xs={3}>
                    <ToggleFilterAccordionButton
                        clickHandler={toggleAccordion}
                        isExpanded={expanded}
                    />
                </Grid>
                <Grid item xs={3}>
                    <EntityCounter size={size} entityName="informes" />
                </Grid>
            </Grid>

            <Collapse in={expanded} timeout="auto" sx={{width: "100%"}}>
                <Grid
                    container
                    component="form"
                    columnSpacing={1}
                    alignItems="center"
                    mb={3}
                >
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
                            onChangeHandler={option => {
                                handleChange({
                                    district: option ? option.value : null,
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormDatePicker
                            name="date_from"
                            label="Desde el día"
                            margin="none"
                            onChangeHandler={option =>
                                handleChange({date_from: option})
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormDatePicker
                            name="date_to"
                            label="Hasta el día"
                            margin="none"
                            onChangeHandler={option => handleChange({date_to: option})}
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

export default FieldReportFilterForm;
