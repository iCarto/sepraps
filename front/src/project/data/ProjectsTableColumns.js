import {theme} from "Theme";
import {NumberUtil} from "base/format/utilities";
import {ProgressBarSmall} from "base/progress/components";
import {ProjectTypeIcon} from "project/presentational";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

//TODO: avoid duplicated constant.
const NO_BCM_DATA_MESSAGE = "No hay datos suficientes para mostrar el avance";

const iconBoxStyle = {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: `solid 2px ${theme.palette.primary.dark}`,
    bgcolor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

export function useProjectTable() {
    const tableColumns = [
        {
            id: "name",
            label: "Localidad",
            width: 20,
        },
        {
            id: "code",
            label: "Código",
            width: 10,
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
            id: "works",
            label: "Tipo y clase",
            formatFunction: item => {
                return (
                    <Stack direction="row" spacing={0.5}>
                        {item.project_works.map((project_work, index) => {
                            return (
                                <Box
                                    sx={{
                                        ...iconBoxStyle,
                                    }}
                                >
                                    <ProjectTypeIcon
                                        projectWorkData={project_work}
                                        size="small"
                                    />
                                </Box>
                            );
                        })}
                    </Stack>
                );
            },
            width: 10,
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
