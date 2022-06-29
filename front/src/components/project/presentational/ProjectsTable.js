import {useSort} from "hooks";

import {TableSortingHead} from "components/common/presentational";
import {MilestoneTimelineShort} from "components/milestone/presentational";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const headCells = [
    {
        id: "name",
        label: "Localidad",
        width: 16,
    },
    {
        id: "code",
        label: "Código",
        width: 12,
    },
    {
        id: "location",
        label: "Ubicación",
        width: 16,
    },
    {
        id: "description",
        label: "Descripción",
        width: 30,
    },
    {
        id: "milestones",
        label: "Estado",
    },
    {
        id: "actions",
    },
];

const ProjectsTable = ({projects, selectedElement = null, onSelectElement = null}) => {
    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "code",
        "asc"
    );

    const tableRowStyle = {
        "&:last-child td, &:last-child th": {
            border: 0,
        },
        paddingRight: "12px",
    };

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
                                sx={tableRowStyle}
                                onClick={() => handleClick(project)}
                                selected={selectedElement?.id === project.id}
                                style={noPointer}
                            >
                                <TableCell>{project.name}</TableCell>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{width: "100%"}}
                                >
                                    {project.code}
                                </TableCell>
                                <TableCell>{project.location}</TableCell>
                                <TableCell>{project.description}</TableCell>
                                <TableCell>
                                    <MilestoneTimelineShort
                                        milestones={project.milestones}
                                    />
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
