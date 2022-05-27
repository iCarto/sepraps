import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";

import {useQuestionnaireInstanceView} from "../provider";
import {
    QuestionnaireInstanceChangeView,
    QuestionnaireFieldTable,
    QuestionnaireExpectedVsRealFieldChart,
    QuestionnaireExpectedVsRealFieldTable,
} from "../presentational";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const ViewQuestionnaireInstanceFieldData = ({getDataService, fieldLabel}) => {
    const {view} = useQuestionnaireInstanceView();
    const location = useLocation();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getDataService().then(data => {
            console.log({data});
            setData(data);
            setLoading(false);
        });
    }, [getDataService, location.state?.lastRefreshDate]);

    const getViewComponent = () => {
        if (data) {
            if (view === "table") {
                if (data["expected_values"]) {
                    return (
                        <QuestionnaireExpectedVsRealFieldTable
                            fieldLabel={fieldLabel}
                            data={data}
                        />
                    );
                } else {
                    return (
                        <QuestionnaireFieldTable fieldLabel={fieldLabel} data={data} />
                    );
                }
            }
            if (view === "chart") {
                return (
                    <QuestionnaireExpectedVsRealFieldChart
                        fieldLabel={fieldLabel}
                        data={data}
                    />
                );
            }
        }
    };

    return (
        <Stack spacing={2} sx={{mb: 5}}>
            <Grid item container justifyContent="space-between">
                <Typography variant="h6">{fieldLabel}</Typography>
                <QuestionnaireInstanceChangeView />
            </Grid>
            {loading && (
                <Grid item container justifyContent="center" xs={12}>
                    <CircularProgress color="inherit" size={20} />
                </Grid>
            )}
            {getViewComponent()}
        </Stack>
    );
};

export default ViewQuestionnaireInstanceFieldData;
