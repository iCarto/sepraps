import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {StatsService} from "service/api";

import {
    QuestionnaireFieldTable,
    QuestionnaireExpectedVsRealFieldChart,
    QuestionnaireExpectedVsRealFieldTable,
} from "../presentational";
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

const ViewQuestionnaireInstanceFieldData = ({
    questionnaireCode,
    fieldCode,
    filter,
    fieldLabel,
}) => {
    const location = useLocation();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        StatsService.getStatsByQuestionnaires(
            questionnaireCode,
            fieldCode,
            filter
        ).then(data => {
            console.log({data});
            setData(data);
            setLoading(false);
        });
    }, [questionnaireCode, fieldCode, filter, location.state?.lastRefreshDate]);

    const getCSVUrl = () => {
        return StatsService.getStatsByQuestionnairesUrl(
            questionnaireCode,
            fieldCode,
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
                                fieldLabel={fieldLabel}
                                data={data}
                                downloadPath={getCSVUrl()}
                            />
                        </StyledBox>
                        <StyledBox>
                            <QuestionnaireExpectedVsRealFieldChart
                                fieldLabel={fieldLabel}
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
                                fieldLabel={fieldLabel}
                                data={data}
                                downloadPath={getCSVUrl()}
                            />
                        </StyledBox>
                        <StyledBox>
                            <QuestionnaireExpectedVsRealFieldChart
                                fieldLabel={fieldLabel}
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
            <Grid item container alignItems="center">
                <BarChartIcon
                    sx={{color: theme => theme.palette["grey"]["300"], mr: 1}}
                />
                <Typography variant="h6">{fieldLabel}</Typography>
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
