import {DateUtil, NumberUtil} from "base/format/utilities";
import {SectionField} from "base/ui/section/components";
import {ListTableFolder} from "base/file/components";
import Grid from "@mui/material/Grid";

const TrainingData = ({training = null}) => {
    const totalParticipants = training.number_of_women + training.number_of_men;
    const womenRate = NumberUtil.formatFloat(
        (training.number_of_women * 100) / totalParticipants,
        2
    );

    return (
        <Grid container columnSpacing={2}>
            <Grid container item xs={6} md={4}>
                <SectionField
                    label="Fecha de inicio"
                    value={DateUtil.formatDate(training.start_date)}
                />
            </Grid>
            <Grid container item xs={6} md={4}>
                <SectionField
                    label="Fecha de finalización"
                    value={DateUtil.formatDate(training.end_date)}
                />
            </Grid>
            <Grid container item xs={6} md={4}>
                <SectionField
                    label="Horas de capacitación"
                    value={training.number_of_hours}
                />
            </Grid>

            <Grid item xs={6}>
                <SectionField label="Contrato" value={training?.contract?.number} />
            </Grid>
            <Grid item xs={6}>
                <SectionField label="Contratista" value={training?.contractor?.name} />
            </Grid>

            <Grid container item xs={6}>
                <SectionField label="Modalidad" value={training.method_label} />
            </Grid>
            <Grid container item xs={6}>
                <SectionField
                    label="Población meta"
                    value={training.target_population_label}
                />
            </Grid>

            <Grid container item xs={6}>
                <SectionField label="Nº de participantes" value={totalParticipants} />
            </Grid>
            <Grid container item xs={6}>
                <SectionField
                    label="Mujeres"
                    value={
                        training.number_of_women
                            ? `${training.number_of_women} (${womenRate}%)`
                            : 0
                    }
                />
            </Grid>

            <Grid container item xs={6}>
                <SectionField
                    label="Materiales impresos entregados"
                    value={training.number_of_printed_materials}
                />
            </Grid>
            <Grid container item xs={6}>
                <SectionField
                    label="Materiales digitales entregados"
                    value={training.number_of_digital_materials}
                />
            </Grid>

            <Grid item xs={12}>
                <ListTableFolder folderPath={training.folder} basePath={""} />
            </Grid>
        </Grid>
    );
};

export default TrainingData;
