import {NumberUtil} from "base/format/utilities";
import {ProgressBarSmall} from "base/progress/components";
import {
    ProjectTypeClassChip,
    ProjectTypeClassChips,
    ProjectTypeIcon,
} from "project/presentational";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

//TODO: avoid duplicated constant.
const NO_BCM_DATA_MESSAGE = "No hay datos suficientes para mostrar el avance";

export function useProjectTable() {
    const tableColumns = [
        {
            id: "name",
            label: "Localidad",
            width: 15,
        },
        {
            id: "code",
            label: "Código",
            width: 10,
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
