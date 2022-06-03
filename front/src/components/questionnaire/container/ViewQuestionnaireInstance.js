import {useEffect, useState} from "react";

import {
    QuestionnaireInstanceMonitoring,
    QuestionnaireInstanceEmpty,
    QuestionnaireInstanceData,
} from "../presentational";
import {SectionHeading} from "components/common/presentational";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
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

const ViewQuestionnaireInstance = ({projectQuestionnaire}) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        setTabValue(0);
    }, [projectQuestionnaire]);

    const hasInstances = projectQuestionnaire?.questionnaire_instances?.length > 0;

    return (
        <Container maxWidth="lg">
            <Paper sx={{p: 3}}>
                <Stack direction="row" justifyContent="space-between" sx={{mb: 3}}>
                    <SectionHeading>
                        {projectQuestionnaire?.questionnaire?.name}
                    </SectionHeading>
                </Stack>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="tab-questionnaire-instance"
                    >
                        <Tab label="Datos" {...a11yProps(0)} />
                        {hasInstances && <Tab label="Seguimiento" {...a11yProps(1)} />}
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    {hasInstances ? (
                        <QuestionnaireInstanceData
                            projectQuestionnaire={projectQuestionnaire}
                        />
                    ) : (
                        <QuestionnaireInstanceEmpty
                            projectQuestionnaire={projectQuestionnaire}
                        />
                    )}
                </TabPanel>
                {hasInstances && (
                    <TabPanel value={tabValue} index={1}>
                        <QuestionnaireInstanceMonitoring
                            projectQuestionnaire={projectQuestionnaire}
                        />
                    </TabPanel>
                )}
            </Paper>
        </Container>
    );
};

export default ViewQuestionnaireInstance;
