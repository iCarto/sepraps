import {useEffect, useState} from "react";

import {TableDownloadButton, TotalsTable} from "base/table/components";
import {AlertError} from "base/error/components";
import {Spinner} from "base/shared/components";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {PaymentStatsService} from "payment/service";
import {DateUtil} from "base/format/utilities";
import {usePaymentTotalsTable} from "payment/data";

const ViewPaymentsTotalsTable = ({filter, showContract = false}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const {tableColumns} = usePaymentTotalsTable(showContract);

    useEffect(() => {
        setIsLoading(true);
        PaymentStatsService.getPaymentStatsTotals({
            ...filter,
        })
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log({error});
                setError(error);
                setIsLoading(false);
            });
    }, [filter]);

    const getIsEmpty = data => {
        const dataValues = Object.values(data).flat();
        return dataValues.every(value => value === 0 || value === "total");
    };

    return (
        <>
            <AlertError error={error} />
            <Stack alignItems="flex-end" spacing={3}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        {data && !getIsEmpty(data) ? (
                            <>
                                <TotalsTable
                                    dataRows={data}
                                    tableColumns={tableColumns}
                                />
                                <TableDownloadButton
                                    service={format => {
                                        return PaymentStatsService.getPaymentStatsTotals(
                                            {
                                                ...filter,
                                            },
                                            format
                                        );
                                    }}
                                />
                            </>
                        ) : (
                            <Alert severity="info" sx={{width: "100%"}}>
                                No hay datos para mostrar.
                            </Alert>
                        )}
                    </>
                )}
            </Stack>
        </>
    );
};

export default ViewPaymentsTotalsTable;
