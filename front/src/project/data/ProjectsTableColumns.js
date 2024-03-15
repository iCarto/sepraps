import {NumberUtil} from "base/format/utilities";
import {ProgressBarSmall} from "base/progress/components";
import Box from "@mui/material/Box";

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
            width: 15,
        },
        {
            id: "location",
            label: "Ubicación",
            width: 20,
        },
        {
            id: "description",
            label: "Descripción",
            width: 25,
        },
        {
            id: "milestones",
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
            width: 25,
        },
    ];

    const getCellProps = item => {
        if (item.closed) return {sx: {opacity: 0.5}};
        return {};
    };

    return {tableColumns, getCellProps};
}
