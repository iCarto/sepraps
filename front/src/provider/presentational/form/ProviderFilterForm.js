import {useCallback, useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {LocationService} from "sepraps/location/service";

import {useList} from "base/entity/hooks";
import {EntityCounter} from "base/entity/components";
import {SearchBox} from "base/search/components";
import {FormAutocomplete, FormClearButton} from "base/form/components";
import {ToggleFilterAccordionButton} from "base/shared/components";

import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";

const ProviderFilterForm = ({onClear = null}) => {
    const {filter, setFilter, setPage, size} = useList();
    const isFilterEmpty =
        !filter?.searchText && !filter?.department && !filter?.district;

    const [loadedDomains, setLoadedDomains] = useState(false);
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
            Promise.all([LocationService.getAdministrativeDivisions()]).then(
                ([administrativeDivisions]) => {
                    const {departments, districts} = administrativeDivisions;
                    setDepartments(departments);
                    setDistricts(districts);
                    setLoadedDomains(true);
                }
            );
        }
    }, [expanded, loadedDomains]);

    const formMethods = useForm({
        defaultValues: {
            searchText: filter?.searchText || "",
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
            searchText: "",
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
                    <EntityCounter size={size} entityName={"prestadores"} />
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

                    <Grid item xs>
                        <FormClearButton handleClear={handleClearAllFilters} />
                    </Grid>
                </Grid>
            </Collapse>
        </FormProvider>
    );
};

export default ProviderFilterForm;
