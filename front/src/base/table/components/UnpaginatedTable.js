import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {useList} from "base/entity/hooks";
import {useAuth} from "base/user/provider";

import {AlertError} from "base/error/components";
import {TableCustomCell, TableSortingHead} from "base/table/components";
import {Spinner} from "base/shared/components";
import {EntityNoItemsComponent} from "base/entity/components/presentational";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

const UnpaginatedTable = ({
    columns,
    service,
    selectedElement = null,
    onSelectElement = null,
    getCellProps = null,
    sortable = true,
}) => {
    const location = useLocation();

    const {filter, size, setSize, sort, setSort, order, setOrder} = useList();

    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {ROLES} = useAuth();

    const noElements = !size && !elements.length;
    const isFilterEmpty = Object.values(filter).every(value => !value);

    const tableRowStyle = {
        cursor: onSelectElement ? "pointer" : "auto",
    };

    useEffect(() => {
        setLoading(true);
        const serviceCall = service(filter, sort, order);
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
    }, [filter, sort, order, location.state?.lastRefreshDate]);

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
        if (sortable) {
            const isAsc = sort === property && order === "asc";
            setSort(property);
            setOrder(isAsc ? "desc" : "asc");
            setSort(property);
        }
    };

    return (
        <>
            <AlertError error={error} />
            {loading ? (
                <Spinner />
            ) : noElements ? (
                <EntityNoItemsComponent isFilterEmpty={true} />
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
                                onRequestSort={sortable ? handleRequestSort : null}
                                headCells={columns}
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
                                                        key={index}
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
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            )}
        </>
    );
};

export default UnpaginatedTable;
