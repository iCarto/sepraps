import {SectionBox, SectionField} from "base/ui/section/components";
import {NumberUtil} from "base/format/utilities";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const ConnectionData = ({connection}) => {
    return (
        <Grid container columnSpacing={2}>
            <Grid container item xs={6} direction="column">
                <SectionBox label="Datos demográficos">
                    <SectionField
                        label="Número de viviendas"
                        value={NumberUtil.formatInteger(
                            connection.number_of_households
                        )}
                    />
                    <SectionField
                        label="Número de habitantes"
                        value={NumberUtil.formatInteger(connection.population)}
                    />
                </SectionBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                <SectionBox label="Conexiones">
                    <SectionField
                        label="Número de conexiones existentes"
                        value={NumberUtil.formatInteger(
                            connection.number_of_existing_connections
                        )}
                    />
                    <SectionField
                        label="Número de conexiones previstas"
                        value={NumberUtil.formatInteger(
                            connection.number_of_planned_connections
                        )}
                    />
                    <SectionField
                        label="Número de conexiones reales"
                        value={NumberUtil.formatInteger(
                            connection.number_of_actual_connections
                        )}
                    />
                    <Divider sx={{my: 2}} />
                    <Grid container direction="row" columnSpacing={3}>
                        <Grid item xs={6}>
                            <SectionField
                                label="Viviendas conectadas"
                                value={NumberUtil.formatDecimal(
                                    connection.connected_households_percentage
                                )}
                                unit="%"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <SectionField
                                label="Cobertura"
                                value={NumberUtil.formatDecimal(connection.coverage)}
                                unit="%"
                            />
                        </Grid>
                    </Grid>
                </SectionBox>
            </Grid>
        </Grid>
    );
};

export default ConnectionData;
