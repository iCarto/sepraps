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
}) => {
    const serviceOptions = getFilterOptionsObject(
        trainingData,
        "social_component_monitoring_id",
        "social_component_monitoring_name"
    );
    const contractOptions = getFilterOptionsObject(
        trainingData,
        "contract_id",
        "contract_number"
    );
    const contractorOptions = getFilterOptionsObject(
        trainingData,
        "contractor_id",
        "contractor_name"
    );

    const formMethods = useForm({
        defaultValues: {
            contract: filter?.contract || "",
            contractor: filter?.contractor || "",
            social_component_monitoring: filter?.social_component_monitoring || "",
        },
    });

    const handleChangeFilter = attributeValue => {
        onChangeFilter({...filter, ...attributeValue});
    };

    const handleClearAllFilters = () => {
        formMethods.reset({
            contract: "",
            contractor: "",
            social_component_monitoring: "",
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
                        name="contract"
                        label="Contrato"
                        options={contractOptions}
                        optionLabelAttribute="label"
                        onChangeHandler={option =>
                            handleChangeFilter({
                                contract: option ? option.id : null,
                            })
                        }
                    />
                </Grid>
                <Grid item sx={{flex: 1}}>
                    <FormAutocomplete
                        name="contractor"
                        label="Consultora"
                        options={contractorOptions}
                        optionLabelAttribute="label"
                        onChangeHandler={option =>
                            handleChangeFilter({
                                contractor: option ? option.id : null,
                            })
                        }
                    />
                </Grid>
                <Grid item>
                    <FormClearButtonSmall handleClear={handleClearAllFilters} />
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export {SocialComponentsTrainingsTableFilterForm as default};
