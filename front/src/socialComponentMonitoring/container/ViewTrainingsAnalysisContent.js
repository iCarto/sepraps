import {useState} from "react";

import {
    ViewSocialComponentsTrainingsChart,
    ViewSocialComponentsTrainingsTotalsTable,
} from "socialComponent/container";

import {SectionCard} from "base/ui/section/components";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {TabUtil} from "base/ui/tab/utilities";
import {TabPanel} from "base/ui/tab/components";

const ViewTrainingsAnalysisContent = ({
    filter,
    showProject = false,
    showContract = false,
}) => {
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
                    filter={filter}
                    showProject={showProject}
                    showContract={showContract}
                />
            </TabPanel>
            <TabPanel value={tabValue} index={1} visible={tabValue === 1}>
                <ViewSocialComponentsTrainingsChart filter={filter} />
            </TabPanel>
        </SectionCard>
    );
};

export default ViewTrainingsAnalysisContent;
