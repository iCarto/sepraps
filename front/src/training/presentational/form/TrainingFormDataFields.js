import {useFormContext, useWatch} from "react-hook-form";

import {useDomain} from "sepraps/domain/provider";
import {
    FormBox,
    FormDatePicker,
    FormInputInteger,
    FormSelect,
} from "base/form/components";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";

const TrainingFormDataFields = ({}) => {
    const {targetPopulationTypes, trainingMethodTypes} = useDomain();

    const {project} = useOutletContext();
    const {reset, getValues} = useFormContext();

    const [contractOptions, setContractOptions] = useState([]);
    const [contractorOptions, setContractorOptions] = useState([]);

    useEffect(() => {
        const relatedContractsOptions = project.related_contracts.map(contract => {
            return {
                value: contract.id,
                label: contract.number,
            };
        });
        setContractOptions(relatedContractsOptions);
        const values = getValues();
        if (values.contract) {
            setContractorOptions(getContractorOptions(values.contract));
        }
    }, [project]);

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

    const getContractorOptions = selectedContract => {
        const selectedContractor = project.related_contracts.find(
            contract => contract.id === selectedContract
        )?.contractor;
        return selectedContractor
            ? [{value: selectedContractor.id, label: selectedContractor.name}]
            : [];
    };

    const onChangeContract = selectedContract => {
        reset({...getValues(), contractor: null});
        setContractorOptions(getContractorOptions(selectedContract));
    };

    return (
        <Grid container columnSpacing={2}>
            <Grid item xs={6}>
                <FormSelect
                    name="contract"
                    label="Contrato"
                    options={contractOptions}
                    showEmptyOption
                    rules={{required: "Este campo es obligatorio"}}
                    onChangeHandler={onChangeContract}
                />
            </Grid>
            <Grid item xs={6}>
                <FormSelect
                    name="contractor"
                    label="Contratista"
                    options={contractorOptions}
                    showEmptyOption
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>

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
                    label="Fecha de finalización"
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
                    label="Duración"
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

            <Grid item xs={6} mt={1}>
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
            <Grid item xs={6} mt={1}>
                <FormBox label="Materiales">
                    <FormInputInteger
                        name="number_of_digital_materials"
                        label="Materiales digitales entregados"
                    />
                    <FormInputInteger
                        name="number_of_printed_materials"
                        label="Materiales impresos entregados"
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
