import {cloneElement, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import useTheme from "@mui/material/styles/useTheme";

import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Pagination from "@mui/material/Pagination";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import {useList} from "base/entity/hooks";
import {AlertError} from "base/error/components";
import {TableDownloadButton, TableSortingHead} from "base/table/components";
import {AuthAction} from "base/user/components";
import {MenuActions} from "base/ui/menu";
import {useAuth} from "base/user/provider";

const pageSize = parseInt(process.env.REACT_APP_PAGE_SIZE);

console.log("process.env", process.env);

const EntityTable = ({
    columns,
    service,
    selectedElement = null,
    onSelectElement = null,
    elementActions = [],
}) => {
    const {ROLES} = useAuth();
    const location = useLocation();

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

    const [elements, setElements] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let theme;
    theme = useTheme();

    useEffect(() => {
        console.log("calling");
        setLoading(true);
        const serviceCall =
            typeof service === "function"
                ? service(filter, page, sort, order)
                : service.getPaginatedList(filter, page, sort, order);
        serviceCall
            .then(data => {
                setElements(data.results);
                setSize(data.count);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setError(error);
            });
    }, [filter, page, sort, order, location.state?.lastRefreshDate]);

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

    const handleRequestSort = (event, property) => {
        const isAsc = sort === property && order === "asc";
        setSort(property);
        setOrder(isAsc ? "desc" : "asc");
        setSort(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    let noElementsMessage =
        filter && filter.length === 0
            ? "No existen elementos para mostrar"
            : "No se ha encontrado ningún elemento que coincida con su búsqueda. Por favor, intente realizar otra búsqueda o borre los filtros activos.";

    const getNestedAttributeValue = (element, attribute) => {
        let returnData = element;

        attribute.split(".").forEach(subPath => {
            returnData = returnData[subPath] || "";
        });

        return returnData;
    };

    const getAttributeValue = (element, attribute) => {
        if (attribute.indexOf(".") >= 0) {
            return getNestedAttributeValue(element, attribute);
        }
        return element[attribute];
    };

    return (
        <>
            <AlertError error={error} />{" "}
            {loading ? (
                <Grid item container justifyContent="center" my={6}>
                    <CircularProgress size={40} />
                </Grid>
            ) : elements && elements.length === 0 ? (
                <Container sx={{textAlign: "center"}}>
                    <Typography py={12} sx={{fontStyle: "italic"}}>
                        {noElementsMessage}
                    </Typography>
                </Container>
            ) : (
                elements && (
                    <TableContainer sx={{width: "100%"}}>
                        <Table
                            aria-labelledby="Tabla"
                            size="small"
                            sx={{tableLayout: "fixed"}}
                        >
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
                                {elements &&
                                    elements.map((element, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                key={index}
                                                selected={
                                                    selectedElement === element.id
                                                }
                                                onClick={event =>
                                                    handleSelectElement(event, element)
                                                }
                                            >
                                                {columns.map((cellAttribute, index) => {
                                                    return (
                                                        <TableCell
                                                            key={cellAttribute.id}
                                                        >
                                                            {cellAttribute.formatFunction
                                                                ? cellAttribute.formatFunction(
                                                                      element
                                                                  )
                                                                : element[
                                                                      cellAttribute.id
                                                                  ]}
                                                        </TableCell>
                                                    );
                                                })}
                                                {elementActions &&
                                                elementActions.length > 0 ? (
                                                    <TableCell>
                                                        <AuthAction roles={[]}>
                                                            <MenuActions>
                                                                {elementActions.map(
                                                                    actionMenu =>
                                                                        cloneElement(
                                                                            actionMenu,
                                                                            {
                                                                                element,
                                                                            }
                                                                        )
                                                                )}
                                                            </MenuActions>
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
                )
            )}
        </>
    );
};

export default EntityTable;
