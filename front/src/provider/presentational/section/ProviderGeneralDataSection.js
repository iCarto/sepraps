import {NumberUtil} from "base/format/utilities";
import {SectionField} from "base/ui/section/components";
import Grid from "@mui/material/Grid";

const ProviderGeneralDataSection = ({provider}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <SectionField label="Nombre" value={provider?.name} />
                <SectionField
                    label="Nº miembros de la Comisión Directiva"
                    value={NumberUtil.formatInteger(provider.number_of_members)}
                />
            </Grid>
            <Grid item xs={6}>
                <SectionField label="Área" value={provider?.area_label} />
                <SectionField
                    label="Nº mujeres de la Comisión Directiva"
                    value={NumberUtil.formatInteger(provider.number_of_women)}
                />
            </Grid>
        </Grid>
    );
};

export default ProviderGeneralDataSection;
