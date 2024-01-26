import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";
import {useConnectionsTotalsTable} from "connection/data";

import {TableDownloadButton, TotalsTable} from "base/table/components";
import {AlertError} from "base/error/components";
import {Spinner} from "base/shared/components";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

const ViewConnectionsTotalsTable = ({filter}) => {
    const {tableColumns} = useConnectionsTotalsTable();

    const [connectionsData, setConnectionsData] = useState(null);
    const [isDataObjectEmpty, setIsDataObjectEmpty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        ProjectStatsService.getConnectionsTotalStats({
            ...filter,
        })
            .then(data => {
                setConnectionsData(data);
                setIsDataObjectEmpty(getIsDataEmpty(data));
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    }, [filter]);

    const getIsDataEmpty = trainingData => {
        const combinedTrainingDataValues = Object.values(trainingData).flat();
        return combinedTrainingDataValues.every(
            value => value === 0 || value === "total"
        );
    };

    return isLoading ? (
        <Spinner />
    ) : (
        <>
            <AlertError error={error} />
            {connectionsData && !isDataObjectEmpty ? (
                <Stack alignItems="flex-end" spacing={3}>
                    <TotalsTable
                        dataRows={connectionsData}
                        tableColumns={tableColumns}
                    />
                    <TableDownloadButton
                        service={format => {
                            return ProjectStatsService.getSocialComponentTrainingsTotalStats(
                                {...filter},
                                format
                            );
                        }}
                    />
                </Stack>
            ) : (
                <Alert severity="info">No hay conexiones para mostrar</Alert>
            )}
        </>
    );
};

export default ViewConnectionsTotalsTable;
