import {useCallback} from "react";
import {FormProvider, useForm} from "react-hook-form";

import {useList} from "base/entity/hooks";
import {EntityCounter} from "base/entity/components/presentational";
import {SearchBox} from "base/search/components";

import Grid from "@mui/material/Grid";

const FinancingProgramFilterForm = () => {
    const {filter, setFilter, setPage, size} = useList();

    const formMethods = useForm({
        defaultValues: {
            searchText: filter?.search || "",
        },
    });

    const handleChange = useCallback(
        attributeValue => {
            setPage(1);
            setFilter({...filter, ...attributeValue});
        },
        [filter, setFilter, setPage]
    );

    return (
        <FormProvider {...formMethods}>
            <Grid container spacing={1}>
                <Grid item xs={6} md={7} xl={6}>
                    <SearchBox
                        name="searchText"
                        onChangeHandler={value => handleChange({search: value})}
                    />
                </Grid>
                <Grid item xs={6} md={4} xl={3}>
                    <EntityCounter size={size} entityName={"programas"} />
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default FinancingProgramFilterForm;
