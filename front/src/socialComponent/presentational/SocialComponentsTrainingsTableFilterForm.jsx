import {FormProvider, useForm} from "react-hook-form";
import {FormAutocomplete, FormClearButtonSmall} from "base/form/components";
import Grid from "@mui/material/Grid";

const getFilterOptionsObject = (dataObject, keyForId, keyForLabel) => {
    if (!dataObject || typeof dataObject !== "object") {
        return [];
    }

    const ids = [...new Set(dataObject[keyForId])] || [];
    const labels = [...new Set(dataObject[keyForLabel])] || [];

    const optionsList = ids
        .map((id, index) => ({id: id, label: labels[index]}))
        .filter(item => item.id !== null && item.label !== null);

    return optionsList;
};

const SocialComponentsTrainingsTableFilterForm = ({
    trainingData,
    filter,
    onChangeFilter,
    onClear = null,
    showProject = false,
}) => {
    const contractOptions = getFilterOptionsObject(
        trainingData,
        "contract_id",
        "training_contract_number"
    );
    const contractorOptions = getFilterOptionsObject(
        trainingData,
        "contractor_id",
        "training_contractor_name"
    );
    const projectOptions = getFilterOptionsObject(
        trainingData,
        "project_id",
        "project_code"
    );
    const serviceOptions = getFilterOptionsObject(
        trainingData,
        "social_component_monitoring_id",
        "social_component_monitoring_name"
    );

    const formMethods = useForm({
        defaultValues: {
            // "social_component_xxxx" filters are related directly with social components trainings
            social_component_contract: filter?.social_component_contract || "",
            social_component_contractor: filter?.social_component_contractor || "",
            social_component_monitoring: filter?.social_component_monitoring || "",
            // "project" filter is related with a fk to project where the training is associated through social component
            project: filter?.project || "",
        },
    });

    const handleChangeFilter = attributeValue => {
        onChangeFilter({...filter, ...attributeValue});
    };

    const handleClearAllFilters = () => {
        formMethods.reset({
            social_component_contract: "",
            social_component_contractor: "",
            social_component_monitoring: "",
            project: "",
        });
        if (onClear) {
            onClear();
        }
        onChangeFilter({});
    };

    return (
        <FormProvider {...formMethods}>
            <Grid container columnSpacing={1} alignItems="center" sx={{mt: "0px"}}>
                <Grid item sx={{flex: 1}}>
                    <FormAutocomplete
                        name="social_component_monitoring"
                        label="Servicio"
                        options={serviceOptions}
                        optionLabelAttribute="label"
                        onChangeHandler={option =>
                            handleChangeFilter({
                                social_component_monitoring: option ? option.id : null,
                            })
                        }
                    />
                </Grid>
                <Grid item sx={{flex: 1}}>
                    <FormAutocomplete
                        name="social_component_contract"
                        label="Contrato"
                        options={contractOptions}
                        optionLabelAttribute="label"
                        onChangeHandler={option =>
                            handleChangeFilter({
                                social_component_contract: option ? option.id : null,
                            })
                        }
                    />
                </Grid>
                <Grid item sx={{flex: 1}}>
                    <FormAutocomplete
                        name="social_component_contractor"
                        label="Consultora"
                        options={contractorOptions}
                        optionLabelAttribute="label"
                        onChangeHandler={option =>
                            handleChangeFilter({
                                social_component_contractor: option ? option.id : null,
                            })
                        }
                    />
                </Grid>
                {showProject ? (
                    <Grid item sx={{flex: 1}}>
                        <FormAutocomplete
                            name="project"
                            label="Proyecto"
                            options={projectOptions}
                            optionLabelAttribute="label"
                            onChangeHandler={option =>
                                handleChangeFilter({
                                    project: option ? option.id : null,
                                })
                            }
                        />
                    </Grid>
                ) : null}

                <Grid item>
                    <FormClearButtonSmall handleClear={handleClearAllFilters} />
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export {SocialComponentsTrainingsTableFilterForm as default};
