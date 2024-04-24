import {useState} from "react";
import {useParams} from "react-router-dom";

import {ViewBuildingComponentsFinancialChart} from "buildingComponent/container";
import {SectionCard} from "base/ui/section/components";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {TabUtil} from "base/ui/tab/utilities";
import {ViewBuildingComponentsProgressTotalsTable} from "buildingComponentMonitoring/container";
import {TabPanel} from "base/ui/tab/components";

const ViewBuildingComponentsAnalysisContent = ({
    filter,
    showProject = false,
    showContract = false,
}) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    console.log({filter});

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
                <ViewBuildingComponentsProgressTotalsTable
                    filter={filter}
                    showProject={showProject}
                    showContract={showContract}
                />
            </TabPanel>
            <TabPanel value={tabValue} index={1} visible={tabValue === 1}>
                <ViewBuildingComponentsFinancialChart filter={filter} />
            </TabPanel>
        </SectionCard>
    );
};

export default ViewBuildingComponentsAnalysisContent;
