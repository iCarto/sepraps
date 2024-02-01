import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";
import {useTrainingTotalsTable} from "socialComponent/data";

import {SocialComponentsTrainingsTableFilterForm} from "socialComponent/presentational";
import {TableDownloadButton, TotalsTable} from "base/table/components";
import {AlertError} from "base/error/components";
import {Spinner} from "base/shared/components";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

const ViewSocialComponentsTrainingsTotalsTable = ({filter}) => {
    const [trainingData, setTrainingData] = useState(null);
    const [tableFilter, setTableFilter] = useState(null);
    const [isTrainingDataEmpty, setIsTrainingDataEmpty] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const isContractTable = Object.keys(filter).includes("contract");
    const {tableColumns} = useTrainingTotalsTable(isContractTable);

    useEffect(() => {
        setIsLoading(true);
        ProjectStatsService.getSocialComponentTrainingsTotalStats({
            ...filter,
            ...tableFilter,
        })
            .then(chartData => {
                setTrainingData(chartData);
                setIsTrainingDataEmpty(getIsTrainingDataEmpty(chartData));
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    }, [filter, tableFilter]);

    const getIsTrainingDataEmpty = trainingData => {
        const combinedTrainingDataValues = Object.values(trainingData).flat();
        return combinedTrainingDataValues.every(
            value => value === 0 || value === "total"
        );
    };

    const handleTableFilter = updatedTableFilter => {
        setTableFilter(updatedTableFilter);
    };

    return (
        <>
            <AlertError error={error} />
            <Stack alignItems="flex-end" spacing={3}>
                <SocialComponentsTrainingsTableFilterForm
                    trainingData={trainingData}
                    filter={tableFilter}
                    onChangeFilter={handleTableFilter}
                    displayProjectFilter={isContractTable}
                />
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        {trainingData && !isTrainingDataEmpty ? (
                            <>
                                <TotalsTable
                                    dataRows={trainingData}
                                    tableColumns={tableColumns}
                                />
                                <TableDownloadButton
                                    service={format => {
                                        return ProjectStatsService.getSocialComponentTrainingsTotalStats(
                                            {...filter, ...tableFilter},
                                            format
                                        );
                                    }}
                                />
                            </>
                        ) : (
                            <Alert severity="info">
                                No hay capacitaciones para mostrar.
                            </Alert>
                        )}
                    </>
                )}
            </Stack>
        </>
    );
};

export default ViewSocialComponentsTrainingsTotalsTable;
