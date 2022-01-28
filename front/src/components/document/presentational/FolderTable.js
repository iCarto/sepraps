import {useNavigate} from "react-router-dom";
import {DocumentService} from "service/api";

import {TableSortingHead} from "components/common/presentational";
import {FolderElementIcon} from ".";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useSort} from "hooks";

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
        label: "Acciones",
    },
];

const FolderTable = ({folderElements, selectedElement, onSelectElement, basePath}) => {
    const navigate = useNavigate();

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
            const result = await DocumentService.download(
                folderElement.path,
                folderElement.content_type
            );

            let anchor = document.createElement("a");
            document.body.appendChild(anchor);

            const blob = await result.blob();
            const objectUrl = window.URL.createObjectURL(blob);

            anchor.download = folderElement.name;
            anchor.href = objectUrl;

            anchor.click();

            window.URL.revokeObjectURL(objectUrl);
            document.body.removeChild(anchor);
        } else {
            navigate(basePath + folderElement.path);
        }
    };

    return (
        <TableContainer>
            <Table sx={{minWidth: 750}} aria-labelledby="tableTitle">
                <TableSortingHead
                    order={order}
                    attribute={attribute}
                    onRequestSort={handleRequestSort}
                    headCells={headCells}
                />
                <TableBody>
                    {folderElements.sort(sortFunction).map((folderElement, index) => {
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
                                onDoubleClick={() => handleDoubleClick(folderElement)}
                                selected={selectedElement?.name === folderElement.name}
                            >
                                <TableCell>
                                    <FolderElementIcon element={folderElement} />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {folderElement.name}
                                </TableCell>
                                <TableCell>{folderElement.content_type}</TableCell>
                                <TableCell>{folderElement.size}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FolderTable;
