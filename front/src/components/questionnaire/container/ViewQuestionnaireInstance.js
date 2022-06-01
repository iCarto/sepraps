import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {ProjectService} from "service/api";

import {
    QuestionnaireInstanceList,
    QuestionnaireInstanceSummary,
} from "../presentational";
import {QuestionnaireInstanceViewProvider} from "components/questionnaire/provider";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const ViewQuestionnaireInstance = ({projectId, questionnaireCode}) => {
    const location = useLocation();

    const [projectQuestionnaire, setProjectQuestionnaire] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        ProjectService.getProjectsQuestionnaireInstances(
            projectId,
            questionnaireCode
        ).then(projectQuestionnaire => {
            console.log({projectQuestionnaire});
            setLoading(false);
            setProjectQuestionnaire(projectQuestionnaire);
        });
    }, [projectId, questionnaireCode, location.state?.lastRefreshDate]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container maxWidth="lg">
            <Paper sx={{p: 3}}>
                <Stack direction="row" justifyContent="space-between" sx={{mb: 3}}>
                    <Typography variant="h5">
                        {projectQuestionnaire?.questionnaire?.name}
                    </Typography>
                </Stack>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="tab-questionnaire-instance"
                    >
                        <Tab label="Datos" {...a11yProps(0)} />
                        <Tab label="Seguimiento" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                {loading && (
                    <Grid item container justifyContent="center" xs={12}>
                        <CircularProgress color="inherit" size={20} />
                    </Grid>
                )}
                {projectQuestionnaire && (
                    <>
                        <TabPanel value={tabValue} index={0}>
                            <QuestionnaireInstanceList
                                projectQuestionnaire={projectQuestionnaire}
                            />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <QuestionnaireInstanceViewProvider>
                                <QuestionnaireInstanceSummary
                                    projectQuestionnaire={projectQuestionnaire}
                                />
                            </QuestionnaireInstanceViewProvider>
                        </TabPanel>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default ViewQuestionnaireInstance;
