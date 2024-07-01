import {NumberUtil} from "base/format/utilities";
import {ProgressBarSmall} from "base/progress/components";
import {ProjectTypeClassChips} from "project/presentational";
import Box from "@mui/material/Box";
import {TextLink} from "base/navigation/components";

//TODO: avoid duplicated constant.
const NO_BCM_DATA_MESSAGE = "No hay datos suficientes para mostrar el avance";

export function useProjectTable() {
    const tableColumns = [
        {
            id: "name",
            label: "Localidad",
            width: 15,
            formatFunction: item => (
                <TextLink
                    text={item.name}
                    to={`/projects/list/${item.id}`}
                    textStyle={{fontSize: "1em"}}
                />
            ),
        },
        {
            id: "code",
            label: "Código",
            width: 10,
            formatFunction: item => (
                <TextLink
                    text={item.code}
                    to={`/projects/list/${item.id}`}
                    textStyle={{fontSize: "1em"}}
                />
            ),
        },
        {
            id: "location",
            label: "Ubicación",
            width: 15,
        },
        {
            id: "works",
            label: "Tipo y clase",
            formatFunction: item => {
                return <ProjectTypeClassChips projectWorks={item?.project_works} />;
            },
            width: 15,
        },
        {
            id: "description",
            label: "Descripción",
            width: 30,
        },
        {
            id: "trainings",
            label: "Capacitaciones",
            width: 10,
            formatFunction: item =>
                item.number_of_participants
                    ? `${item.number_of_participants} (${item.percentage_of_women}% mujeres)`
                    : "",
        },
        {
            id: "connections",
            label: "Conexiones",
            width: 10,
            formatFunction: item =>
                item.number_of_planned_connections
                    ? `${item.number_of_actual_connections}/${item.number_of_planned_connections} (${item.percentage_of_connections}%)`
                    : "",
        },
        {
            id: "progress",
            label: "Avance",
            formatFunction: item => {
                return (
                    <Box sx={{py: 0.5}}>
                        <ProgressBarSmall
                            progressValue={NumberUtil.formatDecimalWithoutZeros(
                                item.financial_progress_percentage
                            )}
                            tooltipLabel={
                                item.financial_progress_percentage
                                    ? `Avance financiero: ${NumberUtil.formatDecimalWithoutZeros(
                                          item.financial_progress_percentage
                                      )}%`
                                    : NO_BCM_DATA_MESSAGE
                            }
                            progressStyle={{mb: 1}}
                        />
                        <ProgressBarSmall
                            progressValue={NumberUtil.formatDecimalWithoutZeros(
                                item.physical_progress_percentage
                            )}
                            tooltipLabel={
                                item.physical_progress_percentage
                                    ? `Avance físico: ${NumberUtil.formatDecimalWithoutZeros(
                                          item.physical_progress_percentage
                                      )}%`
                                    : NO_BCM_DATA_MESSAGE
                            }
                        />
                    </Box>
                );
            },
            width: 15,
        },
    ];

    const getCellProps = item => {
        if (item.closed) return {sx: {opacity: 0.5}};
        return {};
    };

    return {tableColumns, getCellProps};
}
