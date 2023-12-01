import {useFormContext, useWatch} from "react-hook-form";

import {useDomain} from "sepraps/domain/provider";
import {ContractSearchAutocomplete} from "contract/presentational";
import {ContractorSearchAutocomplete} from "contractor/presentational";
import {
    FormBox,
    FormDatePicker,
    FormInputInteger,
    FormSelect,
} from "base/form/components";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const TrainingFormDataFields = ({contract = null, contractor = null}) => {
    const {targetPopulationTypes, trainingMethodTypes} = useDomain();

    const numberOfWomen = useWatch({
        name: "number_of_women",
    });
    const numberOfMen = useWatch({
        name: "number_of_men",
    });
    const printedMaterials = useWatch({
        name: "number_of_digital_materials",
    });
    const digitalMaterials = useWatch({
        name: "number_of_printed_materials",
    });

    const totalParticipants = (numberOfWomen || 0) + (numberOfMen || 0);
    const totalMaterials = (printedMaterials || 0) + (digitalMaterials || 0);

    const {reset, getValues} = useFormContext();

    const handleSelectSocialContract = contract => {
        const values = getValues();
        reset({
            ...values,
            contract: contract.id,
        });
    };

    const handleSelectSocialContractor = contractor => {
        const values = getValues();
        reset({
            ...values,
            contractor: contractor.id,
        });
    };

    return (
        <Grid container columnSpacing={2}>
            <Grid item xs={6}>
                <FormDatePicker
                    name="start_date"
                    label="Fecha de inicio"
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
            <Grid item xs={6}>
                <FormDatePicker
                    name="end_date"
                    label="Fecha de fin"
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
            <Grid item xs={6}>
                <FormSelect
                    name="method"
                    label="Modalidad"
                    options={trainingMethodTypes}
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
            <Grid item xs={6}>
                <FormInputInteger
                    name="number_of_hours"
                    label="Horas de capacitación"
                    endAdornment="h"
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
            <Grid item xs={12}>
                <FormSelect
                    name="target_population"
                    label="Población meta"
                    options={targetPopulationTypes}
                    multiple
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
            <Grid item xs={6}>
                <ContractSearchAutocomplete
                    handleSelect={handleSelectSocialContract}
                    defaultValue={contract}
                />
            </Grid>
            <Grid item xs={6}>
                <ContractorSearchAutocomplete
                    handleSelect={handleSelectSocialContractor}
                    defaultValue={contractor}
                />
            </Grid>
            <Grid item xs={6}>
                <FormBox label="Participantes">
                    <FormInputInteger name="number_of_women" label="Mujeres" />
                    <FormInputInteger name="number_of_men" label="Hombres" />
                    <TextField
                        label="Total"
                        value={totalParticipants}
                        fullWidth
                        disabled
                        InputLabelProps={{shrink: true}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">personas</InputAdornment>
                            ),
                        }}
                    />
                </FormBox>
            </Grid>
            <Grid item xs={6}>
                <FormBox label="Materiales">
                    <FormInputInteger
                        name="number_of_digital_materials"
                        label="Nº de materiales digitales entregados"
                    />
                    <FormInputInteger
                        name="number_of_printed_materials"
                        label="Nº de materiales impresos entregados"
                    />
                    <TextField
                        label="Total"
                        value={totalMaterials}
                        fullWidth
                        disabled
                        InputLabelProps={{shrink: true}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    materiales
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormBox>
            </Grid>
        </Grid>
    );
};

export default TrainingFormDataFields;
