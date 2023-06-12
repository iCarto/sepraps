import {cloneElement, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {useList} from "base/entity/hooks";

import {AlertError} from "base/error/components";
import {
    TableCustomCell,
    TableDownloadButton,
    TableSortingHead,
} from "base/table/components";
import {AuthAction} from "base/user/components";
import {ActionsMenu} from "base/ui/menu";
import {Spinner} from "base/shared/components";
import {EntityNoItemsComponent} from "base/entity/components/presentational";

import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Pagination from "@mui/material/Pagination";

const pageSize = parseInt(process.env.REACT_APP_PAGE_SIZE);

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
    selectedElement = null,
    onSelectElement = null,
    elementActions = [],
    getCellProps = null,
}) => {
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

    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const noElements = !size && !elements.length;
    const isFilterEmpty = Object.values(filter).every(value => !value);

    useEffect(() => {
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
            <AlertError error={error} />
            {loading ? (
                <Spinner />
            ) : noElements ? (
                <EntityNoItemsComponent isFilterEmpty={isFilterEmpty} />
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
                                {elements?.map((element, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={index}
                                            sx={tableRowStyle}
                                            selected={selectedElement === element.id}
                                            onClick={event =>
                                                handleSelectElement(event, element)
                                            }
                                        >
                                            {columns.map((cellAttribute, index) => {
                                                return (
                                                    <TableCustomCell
                                                        id={cellAttribute.id}
                                                        TableCellProps={
                                                            getCellProps
                                                                ? getCellProps(element)
                                                                : null
                                                        }
                                                    >
                                                        {cellAttribute.formatFunction
                                                            ? cellAttribute.formatFunction(
                                                                  element
                                                              )
                                                            : element[cellAttribute.id]}
                                                    </TableCustomCell>
                                                );
                                            })}
                                            {elementActions?.length ? (
                                                <TableCell>
                                                    <AuthAction roles={[]}>
                                                        <ActionsMenu>
                                                            {elementActions.map(
                                                                actionMenu =>
                                                                    cloneElement(
                                                                        actionMenu,
                                                                        {
                                                                            element,
                                                                        }
                                                                    )
                                                            )}
                                                        </ActionsMenu>
                                                    </AuthAction>
                                                </TableCell>
                                            ) : (
                                                <TableCell></TableCell>
                                            )}
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