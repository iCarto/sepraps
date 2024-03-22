import {theme} from "Theme";
import {useSort} from "base/table/hooks";

import {NumberUtil} from "base/format/utilities";
import {ProgressBarSmall} from "base/progress/components";
import {TableSortingHead} from "base/table/components";
import {ProjectTypeClassChips, ProjectTypeIcon} from ".";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

//TODO: avoid duplicated code in project progress bars & type icons.
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

const headCells = [
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
        width: 15,
    },
    {
        id: "description",
        label: "Descripción",
        width: 25,
    },
    {
        id: "works",
        label: "Tipo y clase",
        width: 15,
    },
    {
        id: "progress",
        label: "Avance",
        width: 15,
    },
];

const ProjectsTable = ({projects, selectedElement = null, onSelectElement = null}) => {
    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "code",
        "asc"
    );

    const handleRequestSort = (event, property) => {
        const isAsc = attribute === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setAttribute(property);
    };

    const handleClick = project => {
        onSelectElement && onSelectElement(project);
    };

    const noPointer = {cursor: "default"};

    return (
        <TableContainer sx={{overflowX: "auto"}}>
            <Table aria-labelledby="Projects table" sx={{tableLayout: "fixed"}}>
                <TableSortingHead
                    order={order}
                    attribute={attribute}
                    onRequestSort={handleRequestSort}
                    headCells={headCells}
                />
                <TableBody>
                    {projects.sort(sortFunction).map(project => {
                        return (
                            <TableRow
                                hover
                                key={project.id}
                                onClick={() => handleClick(project)}
                                selected={selectedElement?.id === project.id}
                                style={noPointer}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={project.closed && {color: "grey.500"}}
                                >
                                    {project.name}
                                </TableCell>
                                <TableCell sx={project.closed && {color: "grey.500"}}>
                                    {project.code}
                                </TableCell>
                                <TableCell sx={project.closed && {color: "grey.500"}}>
                                    {project.location}
                                </TableCell>
                                <TableCell sx={project.closed && {color: "grey.500"}}>
                                    {project.description}
                                </TableCell>
                                <TableCell sx={project.closed && {color: "grey.500"}}>
                                    <ProjectTypeClassChips
                                        projectWorks={project?.project_works}
                                    />
                                </TableCell>
                                <TableCell sx={project.closed && {color: "grey.500"}}>
                                    <Box sx={{py: 0.5}}>
                                        <ProgressBarSmall
                                            progressValue={NumberUtil.formatDecimalWithoutZeros(
                                                project.financial_progress_percentage
                                            )}
                                            tooltipLabel={
                                                project.financial_progress_percentage
                                                    ? `Avance financiero: ${NumberUtil.formatDecimalWithoutZeros(
                                                          project.financial_progress_percentage
                                                      )}%`
                                                    : NO_BCM_DATA_MESSAGE
                                            }
                                            progressStyle={{mb: 1}}
                                        />
                                        <ProgressBarSmall
                                            progressValue={NumberUtil.formatDecimalWithoutZeros(
                                                project.physical_progress_percentage
                                            )}
                                            tooltipLabel={
                                                project.physical_progress_percentage
                                                    ? `Avance físico: ${NumberUtil.formatDecimalWithoutZeros(
                                                          project.physical_progress_percentage
                                                      )}%`
                                                    : NO_BCM_DATA_MESSAGE
                                            }
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProjectsTable;
