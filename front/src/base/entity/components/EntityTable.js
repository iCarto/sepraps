import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {AuthAction} from "base/user/components";
import {useNavigateWithReload} from "base/navigation/hooks";
import {AlertError} from "base/error/components";
import {ActionsMenu, Spinner} from "base/shared/components";
import {MenuAction} from "base/ui/menu";
import {DeleteItemDialog} from "base/delete/components";
import {TableDownloadButton, TableSortingHead} from "base/table/components";
import {EntityNoItemsComponent} from "base/entity/components";
import {useList} from "base/entity/hooks";

import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Pagination from "@mui/material/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";

// TO-DO: process.env.REACT_APP_PAGE_SIZE returning NaN even after running install.sh
// const pageSize = parseInt(process.env.REACT_APP_PAGE_SIZE);
const pageSize = 20;

const tableRowStyle = {
    "&:last-child td, &:last-child th": {
        border: 0,
    },
    paddingRight: "12px",
    cursor: "pointer",
};

const EntityTable = ({
    columns,
    service,
    highlightItems = null,
    selectedElement = null,
    onSelectElement = null,
    showDetailAction = true,
    onClickDetailAction = null,
    showEditAction = true,
    onClickEditAction = null,
    showDeleteAction = true,
    onClickDeleteAction = null,
    deleteService = null,
}) => {
    const {ROLES} = useAuth();
    const navigate = useNavigateWithReload();
    const location = useLocation();
    const basePath = location.pathname;

    const {
        filter,
        page,
        setPage,
        size,
        setSize,
        sort,
        setSort,
        order,
        setOrder,
    } = useList();

    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [error, setError] = useState("");

    const noElements = !size;
    const isFilterEmpty = Object.values(filter).every(value => !value);

    useEffect(() => {
        console.log({page, sort, order, filter});
        setLoading(true);
        const serviceCall = service(filter, page, sort, order);
        serviceCall.then(data => {
            setElements(data.results);
            setSize(data.count);
            setLoading(false);
        });
    }, [filter, page, sort, order]); // eslint-disable-line

    const handleSelectElement = (event, element) => {
        const cellIndex = event.target.cellIndex;
        if (
            cellIndex !== undefined &&
            cellIndex !== columns.length &&
            onSelectElement
        ) {
            onSelectElement(element.id);
        }
    };

    const handleClickDetail = element => {
        if (onClickDetailAction) {
            onClickDetailAction(element);
        } else {
            navigate(`${basePath}/${element.id}`);
        }
    };

    const handleClickEdit = element => {
        if (onClickEditAction) {
            onClickEditAction(element);
        } else {
            navigate(`${basePath}/${element.id}/edit`);
        }
    };

    const handleClickDelete = element => {
        setItemToDelete(element);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (onClickDeleteAction) {
            onClickDeleteAction(itemToDelete);
        } else if (deleteService) {
            deleteService(itemToDelete.id)
                .then(() => {
                    navigate(basePath, true);
                })
                .catch(error => {
                    setError(error);
                });
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = sort === property && order === "asc";
        setSort(property);
        setOrder(isAsc ? "desc" : "asc");
        setSort(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return loading ? (
        <Spinner />
    ) : noElements ? (
        <EntityNoItemsComponent isFilterEmpty={isFilterEmpty} />
    ) : (
        <>
            <AlertError error={error} />
            <TableContainer sx={{width: "100%"}}>
                <Table aria-labelledby="Tabla" size="small">
                    <TableSortingHead
                        order={order}
                        attribute={sort}
                        onRequestSort={handleRequestSort}
                        headCells={[
                            ...columns,
                            {
                                id: "actions",
                                width: 5,
                            },
                        ]}
                    />
                    <TableBody>
                        {elements.map((element, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={index}
                                    sx={tableRowStyle}
                                    selected={
                                        selectedElement &&
                                        selectedElement?.id === element.id
                                    }
                                    onClick={event =>
                                        handleSelectElement &&
                                        handleSelectElement(event, element)
                                    }
                                >
                                    {columns.map((cellAttribute, index) => {
                                        return (
                                            <TableCell
                                                key={cellAttribute.id}
                                                sx={
                                                    highlightItems?.formatFunction(
                                                        element
                                                    )
                                                        ? highlightItems.highlightingStyle
                                                        : {}
                                                }
                                            >
                                                {cellAttribute.formatFunction
                                                    ? cellAttribute.formatFunction(
                                                          element
                                                      )
                                                    : element[cellAttribute.id]}
                                            </TableCell>
                                        );
                                    })}
                                    {showDetailAction ||
                                    showDeleteAction ||
                                    showEditAction ? (
                                        <TableCell>
                                            <AuthAction roles={[]}>
                                                <ActionsMenu>
                                                    {showDetailAction && (
                                                        <MenuAction
                                                            name="table-view-action"
                                                            icon={<LaunchIcon />}
                                                            text="Ir al detalle"
                                                            itemId={element.id}
                                                            handleClick={() =>
                                                                handleClickDetail(
                                                                    element
                                                                )
                                                            }
                                                        />
                                                    )}
                                                    {showEditAction && (
                                                        <MenuAction
                                                            name="table-edit-action"
                                                            icon={<EditIcon />}
                                                            text="Modificar"
                                                            itemId={element.id}
                                                            handleClick={() =>
                                                                handleClickEdit(element)
                                                            }
                                                        />
                                                    )}
                                                    {showDeleteAction && (
                                                        <MenuAction
                                                            name="table-delete-action"
                                                            icon={
                                                                <DeleteIcon color="error" />
                                                            }
                                                            text="Eliminar"
                                                            itemId={element.id}
                                                            handleClick={() =>
                                                                handleClickDelete(
                                                                    element
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </ActionsMenu>
                                            </AuthAction>
                                        </TableCell>
                                    ) : null}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {page && (
                    <Grid container justifyContent="space-between" sx={{mt: 3}}>
                        <Grid item>
                            <TableDownloadButton
                                service={service}
                                filter={filter}
                                sort={sort}
                                order={order}
                            />
                        </Grid>
                        <Grid item>
                            <Pagination
                                count={Math.ceil(size / pageSize)}
                                page={page}
                                onChange={handleChangePage}
                            />
                        </Grid>
                    </Grid>
                )}
            </TableContainer>
            <DeleteItemDialog
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
                onDelete={handleDelete}
            />
        </>
    );
};

export default EntityTable;
