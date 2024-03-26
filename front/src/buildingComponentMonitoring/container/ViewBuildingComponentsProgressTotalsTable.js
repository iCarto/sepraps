import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";
import {TableDownloadButton, TotalsTable} from "base/table/components";
import {AlertError} from "base/error/components";
import {Spinner} from "base/shared/components";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {useBcProgressTotalsTable} from "buildingComponentMonitoring/data";

const ViewBuildingComponentsProgressTotalsTable = ({filter}) => {
    const [bcProgressData, setBcProgressData] = useState(null);
    const [tableFilter, setTableFilter] = useState(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const isContractTable = Object.keys(filter).includes("contract");
    const {tableColumns} = useBcProgressTotalsTable(isContractTable);

    useEffect(() => {
        setIsLoading(true);
        console.log({tableFilter});
        ProjectStatsService.getBuildingComponentsProgressTotalStats({
            ...filter,
            ...tableFilter,
        })
            .then(chartData => {
                setBcProgressData(chartData);
                setIsEmpty(getIsEmpty(chartData));
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    }, [filter, tableFilter]);

    const getIsEmpty = data => {
        const dataValues = Object.values(data).flat();
        return dataValues.every(value => value === 0 || value === "total");
    };

    const handleTableFilter = updatedTableFilter => {
        setTableFilter(updatedTableFilter);
    };

    return (
        <>
            <AlertError error={error} />
            <Stack alignItems="flex-end" spacing={3}>
                {/* <SocialComponentsTrainingsTableFilterForm
                    trainingData={bcProgressData}
                    filter={tableFilter}
                    onChangeFilter={handleTableFilter}
                    isContractTable={isContractTable}
                /> */}
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        {bcProgressData && !isEmpty ? (
                            <>
                                <TotalsTable
                                    dataRows={bcProgressData}
                                    tableColumns={tableColumns}
                                />
                                <TableDownloadButton
                                    service={format => {
                                        return ProjectStatsService.getBuildingComponentsProgressTotalStats(
                                            {...filter, ...tableFilter},
                                            format
                                        );
                                    }}
                                />
                            </>
                        ) : (
                            <Alert severity="info" sx={{width: "100%"}}>
                                No hay componentes para mostrar.
                            </Alert>
                        )}
                    </>
                )}
            </Stack>
        </>
    );
};

export default ViewBuildingComponentsProgressTotalsTable;
