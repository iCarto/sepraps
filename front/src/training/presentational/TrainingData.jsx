import {DateUtil, NumberUtil} from "base/format/utilities";
import {SectionBox, SectionField} from "base/ui/section/components";
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
                <SectionField
                    label="Duración"
                    value={training.number_of_hours}
                    unit="horas"
                />
            </Grid>

            <Grid item xs={6}>
                <SectionField label="Consultora" value={training?.contractor?.name} />
                <SectionField label="Modalidad" value={training.method_label} />
                <SectionField
                    label="Población meta"
                    value={training.target_population_label}
                />
            </Grid>

            <Grid item xs={6}>
                <SectionField label="Participantes" value={totalParticipants} />
                <SectionField
                    label="Materiales impresos entregados"
                    value={training.number_of_printed_materials}
                />
            </Grid>

            <Grid item xs={6}>
                <SectionField
                    label="Mujeres"
                    value={
                        training.number_of_women
                            ? `${training.number_of_women} (${womenRate}%)`
                            : 0
                    }
                />
                <SectionField
                    label="Materiales digitales entregados"
                    value={training.number_of_digital_materials}
                />
            </Grid>

            <Grid item xs={12} mt={3}>
                <SectionBox label="Archivos">
                    <ListTableFolder folderPath={training.folder} basePath={""} />
                </SectionBox>
            </Grid>
        </Grid>
    );
};

export default TrainingData;
