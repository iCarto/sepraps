import {useEffect, useState} from "react";

import {ProjectStatsService} from "project/service";
import {NumberUtil} from "base/format/utilities";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const ViewBuildingComponentsFinancialData = ({filter}) => {
    const [financialData, setFinancialData] = useState(null);

    useEffect(() => {
        ProjectStatsService.getBuildingComponentsTotalStats(filter).then(
            financialData => {
                setFinancialData(financialData);
            }
        );
    }, []);

    const BoxData = ({
        firstLineLabel,
        firstLineValue,
        secondLineLabel,
        secondLineValue,
        resultLabel,
        resultValue,
        percentage,
        symbol,
    }) => (
        <Grid
            container
            sx={{border: 1, borderColor: "lightgrey", borderRadius: 5, p: 2}}
        >
            <Grid item xs={8}>
                <Grid container>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                        <Typography>{firstLineLabel}</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{textAlign: "right"}}>
                        <Typography>
                            {NumberUtil.formatInteger(firstLineValue)}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        {symbol}
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>{secondLineLabel}</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{textAlign: "right"}}>
                        <Typography>
                            {NumberUtil.formatInteger(secondLineValue)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{my: 0.5}} />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={5}>
                        <Typography
                            sx={{textTransform: "uppercase", fontWeight: "bold"}}
                        >
                            {resultLabel}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{textAlign: "right", fontWeight: "bold"}}>
                        <Typography>{NumberUtil.formatInteger(resultValue)}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={4} justifyContent="center" alignItems="center">
                <Typography
                    sx={{
                        border: 1,
                        borderColor: "grey",
                        borderRadius: "50%",
                        width: "80px",
                        height: "80px",
                        lineHeight: "80px",
                        textAlign: "center",
                    }}
                >
                    <Typography component="span" fontSize={"1.6em"}>
                        {NumberUtil.formatInteger(percentage)}
                    </Typography>
                    <Typography component="span">%</Typography>
                </Typography>
            </Grid>
        </Grid>
    );

    const getRealFinancialData = financialData => (
        <BoxData
            firstLineLabel="Pagado"
            firstLineValue={financialData.paid_amount}
            secondLineLabel="Pendiente"
            secondLineValue={financialData.pending_amount}
            resultLabel="Total"
            resultValue={financialData.real_amount}
            percentage={financialData.paid_real_percentage}
            symbol="+"
        />
    );

    const getExpectedFinancialData = financialData => (
        <BoxData
            firstLineLabel="Previsto"
            firstLineValue={financialData.expected_amount}
            secondLineLabel="Total"
            secondLineValue={financialData.real_amount}
            resultLabel="DIFERENCIA"
            resultValue={financialData.expected_amount - financialData.real_amount}
            percentage={financialData.real_expected_percentage}
            symbol="-"
        />
    );

    return (
        financialData && (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {getRealFinancialData(financialData)}
                </Grid>
                <Grid item xs={6}>
                    {getExpectedFinancialData(financialData)}
                </Grid>
            </Grid>
        )
    );
};

export default ViewBuildingComponentsFinancialData;
