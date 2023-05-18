import {useCallback} from "react";
import {FormProvider, useForm} from "react-hook-form";

import {useList} from "base/entity/hooks";
import {SearchBox} from "base/search/components";
import {EntityCounter} from "base/entity/components/presentational";

import Grid from "@mui/material/Grid";

const EntityFilterForm = ({entityName}) => {
    const {filter, setFilter, setPage, size} = useList();

    const formMethods = useForm({
        defaultValues: {
            search: filter?.search || "",
        },
    });

    const handleChange = useCallback(
        attributeValue => {
            setPage(1);
            setFilter({...filter, ...attributeValue});
        },
        [filter]
    );

    return (
        <FormProvider {...formMethods}>
            <Grid container mb={3}>
                <Grid item container component="form" spacing={2} xs={12}>
                    <Grid item>
                        <SearchBox
                            name="search"
                            onChangeHandler={value => handleChange({search: value})}
                        />
                    </Grid>
                    <Grid item>
                        <EntityCounter size={size} entityName={entityName} />
                    </Grid>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default EntityFilterForm;
