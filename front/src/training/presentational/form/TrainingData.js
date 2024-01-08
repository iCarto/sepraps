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
            <Grid item xs={6}>
                <SectionField label="Contrato" value={training?.contract?.number} />
            </Grid>
            <Grid item xs={6}>
                <SectionField label="Consultora" value={training?.contractor?.name} />
            </Grid>

            <Grid container item xs={6}>
                <SectionField
                    label="Fecha/s de realización"
                    value={
                        training.end_date
                            ? `${DateUtil.formatDate(
                                  training.start_date
                              )} - ${DateUtil.formatDate(training.end_date)}`
                            : DateUtil.formatDate(training.start_date)
                    }
                />
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
                <SectionField
                    label="Duración"
                    value={training.number_of_hours}
                    unit="horas"
                />
            </Grid>

            <Grid container item xs={6}>
                <SectionField label="Participantes" value={totalParticipants} />
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
