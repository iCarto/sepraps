import {useNavigate} from "react-router-dom";
import {FileUtil} from "utilities";
import {useSort, useDownloadDocument} from "hooks";

import {TableSortingHead} from "components/common/presentational";
import {FolderElementIcon} from ".";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";

const headCells = [
    {
        id: "icon",
        label: "",
    },
    {
        id: "name",
        label: "Nombre",
    },
    {
        id: "content_type",
        label: "Tipo",
    },
    {
        id: "size",
        label: "Tamaño",
    },
    {
        id: "actions",
        label: "",
    },
];

const FolderTable = ({basePath, folderElements, selectedElement, onSelectElement}) => {
    const navigate = useNavigate();
    const downloadDocument = useDownloadDocument();

    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "name",
        "asc"
    );

    const handleRequestSort = (event, property) => {
        const isAsc = attribute === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setAttribute(property);
    };

    const handleClick = async folderElement => {
        if (onSelectElement) {
            onSelectElement(folderElement);
        }
    };

    const handleDoubleClick = async folderElement => {
        if (folderElement.content_type) {
            downloadDocument(
                folderElement.name,
                folderElement.path,
                folderElement.content_type
            );
        } else {
            navigate(basePath + folderElement.path);
        }
    };

    const noPointer = {cursor: "default"};

    console.log({folderElements});

    return (
        <TableContainer>
            {folderElements.length !== 0 ? (
                <Table sx={{minWidth: 750}} aria-labelledby="tableTitle">
                    <TableSortingHead
                        order={order}
                        attribute={attribute}
                        onRequestSort={handleRequestSort}
                        headCells={headCells}
                    />
                    <TableBody>
                        {folderElements
                            .sort(sortFunction)
                            .map((folderElement, index) => {
                                return (
                                    <TableRow
                                        hover
                                        key={index}
                                        sx={{
                                            "&:last-child td, &:last-child th": {
                                                border: 0,
                                            },
                                        }}
                                        onClick={() => handleClick(folderElement)}
                                        onDoubleClick={() =>
                                            handleDoubleClick(folderElement)
                                        }
                                        selected={
                                            selectedElement?.name === folderElement.name
                                        }
                                    >
                                        <TableCell>
                                            <FolderElementIcon
                                                element={folderElement}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            style={noPointer}
                                            sx={{
                                                color: folderElement.content_type
                                                    ? "inherit"
                                                    : "primary.main",
                                                fontWeight: folderElement.content_type
                                                    ? "inherit"
                                                    : "500",
                                            }}
                                        >
                                            {folderElement.name}
                                        </TableCell>
                                        <TableCell style={noPointer}>
                                            {folderElement.content_type}
                                        </TableCell>
                                        <TableCell style={noPointer}>
                                            {folderElement.size &&
                                                FileUtil.formatBytes(
                                                    folderElement.size
                                                )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            ) : (
                <Typography
                    pt={6}
                    sx={{
                        textAlign: "center",
                        fontStyle: "italic",
                    }}
                >
                    Aún no se ha subido ningún documento
                </Typography>
            )}
        </TableContainer>
    );
};

export default FolderTable;
