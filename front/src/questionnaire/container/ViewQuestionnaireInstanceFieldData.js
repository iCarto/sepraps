import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {StatsService} from "stats/service";

import {
    QuestionnaireFieldTable,
    QuestionnaireExpectedVsRealFieldChart,
    QuestionnaireExpectedVsRealFieldTable,
} from "../presentational";
import {AlertError} from "base/error/components";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import BarChartIcon from "@mui/icons-material/BarChart";

import styled from "@mui/material/styles/styled";

const StyledBox = styled(Box)(({theme}) => ({
    padding: 20,
    margin: 10,
}));

const ViewQuestionnaireInstanceFieldData = ({questionnaireCode, field, filter}) => {
    const location = useLocation();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        StatsService.getStatsByQuestionnaires(questionnaireCode, field.code, filter)
            .then(data => {
                console.log({data});
                setData(data);
            })
            .catch(error => {
                console.log({error});
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [questionnaireCode, field, filter, location.state?.lastRefreshDate]);

    const getCSVUrl = () => {
        return StatsService.getStatsByQuestionnairesUrl(
            questionnaireCode,
            field.code,
            filter
        );
    };

    const getViewComponent = () => {
        if (data) {
            if (data["expected_values"]) {
                return (
                    <Stack>
                        <StyledBox>
                            <QuestionnaireExpectedVsRealFieldTable
                                field={field}
                                data={data}
                                downloadPath={getCSVUrl()}
                            />
                        </StyledBox>
                        <StyledBox>
                            <QuestionnaireExpectedVsRealFieldChart
                                field={field}
                                data={data}
                            />
                        </StyledBox>
                    </Stack>
                );
            } else {
                return (
                    <Stack spacing={3}>
                        <StyledBox>
                            <QuestionnaireFieldTable
                                field={field}
                                data={data}
                                downloadPath={getCSVUrl()}
                            />
                        </StyledBox>
                        <StyledBox>
                            <QuestionnaireExpectedVsRealFieldChart
                                field={field}
                                data={data}
                            />
                        </StyledBox>
                    </Stack>
                );
            }
        }
    };

    return (
        <Stack sx={{mb: 5, mt: 3}} spacing={1}>
            <AlertError error={error} />
            <Grid item container alignItems="center">
                <BarChartIcon
                    sx={{color: theme => theme.palette["grey"]["300"], mr: 1}}
                />
                <Typography variant="h6">{field.label}</Typography>
            </Grid>
            <Divider />
            {loading && (
                <Grid item container justifyContent="center" xs={12}>
                    <CircularProgress color="inherit" size={20} sx={{mt: 5}} />
                </Grid>
            )}
            {getViewComponent()}
        </Stack>
    );
};

export default ViewQuestionnaireInstanceFieldData;
