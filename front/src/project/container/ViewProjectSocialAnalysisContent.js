import {useState} from "react";
import {useParams} from "react-router-dom";

import {
    ViewSocialComponentsTrainingsChart,
    ViewSocialComponentsTrainingsTotalsTable,
} from "socialComponent/container";

import {SectionCard} from "base/ui/section/components";
import {TabPanel} from "base/ui/tab/components";
import {TabUtil} from "base/ui/tab/utilities";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const ViewProjectSocialAnalysisContent = () => {
    const {id: projectId} = useParams();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <SectionCard>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="secondary"
                    aria-label="social-components-analysis-tabs"
                >
                    <Tab label="Tabla" {...TabUtil.a11yProps(0)} />
                    <Tab label="Gráfico" {...TabUtil.a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0} visible={tabValue === 0}>
                <ViewSocialComponentsTrainingsTotalsTable
                    filter={{project: projectId}}
                />
            </TabPanel>
            <TabPanel value={tabValue} index={1} visible={tabValue === 1}>
                <ViewSocialComponentsTrainingsChart filter={{project: projectId}} />
            </TabPanel>
        </SectionCard>
    );
};

export default ViewProjectSocialAnalysisContent;
