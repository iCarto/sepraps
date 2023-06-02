import {useDomain} from "sepraps/domain/provider";
import {FormInputInteger, FormInputText, FormSelect} from "base/form/components";
import Grid from "@mui/material/Grid";

const ProviderFormGeneralDataFields = ({orientation = "column"}) => {
    const {providerAreas} = useDomain();

    return (
        <>
            <Grid container columnSpacing={1}>
                <Grid item xs={12}>
                    <FormInputText
                        name="name"
                        label="Nombre del prestador"
                        rules={{required: "Este campo es obligatorio."}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormSelect
                        name="area"
                        label="Área del prestador"
                        options={providerAreas}
                        rules={{required: "Este campo es obligatorio."}}
                    />
                </Grid>
                <Grid item xs={orientation === "column" ? 12 : 6}>
                    <FormInputInteger
                        name="number_of_members"
                        label="Nº de miembros"
                        maxLength={5}
                    />
                </Grid>
                <Grid item xs={orientation === "column" ? 12 : 6}>
                    <FormInputInteger
                        name="number_of_women"
                        label="Nº de mujeres"
                        maxLength={5}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default ProviderFormGeneralDataFields;
