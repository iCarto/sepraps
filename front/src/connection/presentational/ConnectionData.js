import {SectionBox, SectionField} from "base/ui/section/components";
import {NumberUtil} from "base/format/utilities";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const ConnectionData = ({connection, projectClass}) => {
    return (
        <Grid container columnSpacing={2}>
            <Grid container item xs={6} direction="column">
                <SectionBox label="Datos demográficos">
                    <SectionField
                        label="Viviendas totales"
                        value={NumberUtil.formatInteger(
                            connection.number_of_households
                        )}
                    />
                    <SectionField
                        label="Habitantes totales"
                        value={NumberUtil.formatInteger(connection.population)}
                    />
                </SectionBox>
            </Grid>
            <Grid container item xs={6} direction="column">
                <SectionBox label="Conexiones">
                    {projectClass === "mejora" ? (
                        <>
                            <SectionField
                                label="Conexiones existentes"
                                value={NumberUtil.formatInteger(
                                    connection.number_of_existing_connections
                                )}
                            />
                            <Divider sx={{my: 2}} />
                        </>
                    ) : null}
                    <SectionField
                        label="Conexiones previstas"
                        value={NumberUtil.formatInteger(
                            connection.number_of_planned_connections
                        )}
                    />
                    <SectionField
                        label="Conexiones reales"
                        value={NumberUtil.formatInteger(
                            connection.number_of_actual_connections
                        )}
                    />
                    <Divider sx={{my: 2}} />
                    <SectionField
                        label="Viviendas conectadas"
                        value={NumberUtil.formatDecimal(
                            connection.connected_households_percentage
                        )}
                        unit="%"
                    />
                    <SectionField
                        label="Cobertura"
                        value={NumberUtil.formatInteger(connection.coverage)}
                        unit="personas nuevas"
                    />
                </SectionBox>
            </Grid>
        </Grid>
    );
};

export default ConnectionData;
