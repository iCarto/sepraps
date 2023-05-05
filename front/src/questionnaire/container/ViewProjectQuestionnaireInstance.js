import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {
    QuestionnaireInstanceMonitoring,
    QuestionnaireInstanceEmpty,
    QuestionnaireInstanceData,
} from "../presentational";
import {SectionHeading} from "base/section/components";

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

const ViewProjectQuestionnaireInstance = ({projectQuestionnaire}) => {
    const [tabValue, setTabValue] = useState(0);

    let project;
    [project] = useOutletContext();

    const isProjectClosed = project.closed;

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        setTabValue(0);
    }, [projectQuestionnaire]);

    const hasInstances = projectQuestionnaire?.questionnaire_instances?.length > 0;

    return (
        <>
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
                        isProjectClosed={isProjectClosed}
                    />
                ) : (
                    <QuestionnaireInstanceEmpty
                        projectQuestionnaire={projectQuestionnaire}
                        isProjectClosed={isProjectClosed}
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
        </>
    );
};

export default ViewProjectQuestionnaireInstance;
