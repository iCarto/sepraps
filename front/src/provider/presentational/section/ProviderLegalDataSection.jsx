import {DateUtil} from "base/format/utilities";
import {SectionField} from "base/ui/section/components";
import Grid from "@mui/material/Grid";

const ProviderLegalDataSection = ({provider}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <SectionField label="Tipo de prestador" value={provider.type_label} />
                <SectionField
                    label="Legalmente constituida"
                    value={provider.is_legalized_label}
                />
                <SectionField
                    label="Contrato permisionario firmado"
                    value={provider.is_provider_contract_signed_label}
                />
            </Grid>
            <Grid item xs={6}>
                <div style={{width: "100%", height: "50px"}} />
                {provider.type === "junta_de_saneamiento" ? (
                    <SectionField
                        label="Nº de personería jurídica"
                        value={provider.legal_status_number}
                    />
                ) : null}
                {provider.is_legalized && provider.type !== "junta_de_saneamiento" ? (
                    <SectionField
                        label="Nº de resolución municipal"
                        value={provider.local_resolution_number}
                    />
                ) : null}
                {provider.is_legalized ? (
                    <SectionField
                        label="Fecha de legalización"
                        value={DateUtil.formatDate(provider.legalization_date)}
                    />
                ) : null}
            </Grid>
        </Grid>
    );
};

export default ProviderLegalDataSection;
