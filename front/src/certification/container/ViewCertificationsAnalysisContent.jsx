import {
    ViewCertificationsByProjectFinancialChart,
    ViewCertificationsTotalsTable,
} from ".";
import {SectionCard} from "base/ui/section/components";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {TabPanel} from "base/ui/tab/components";
import {useState} from "react";
import {TabUtil} from "base/ui/tab/utilities";

const ViewCertificationsAnalysisContent = ({
    filter,
    filterStartDate = null,
    filterEndDate = null,
    maxAmount = null,
    maxAmendedAmount = null,
    maxEndDate = null,
    maxAmendedEndDate = null,
    showContract = false,
    showProject = false,
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
                <ViewCertificationsTotalsTable
                    filter={filter}
                    showProject={showProject}
                    showContract={showContract}
                />
            </TabPanel>
            <TabPanel value={tabValue} index={1} visible={tabValue === 1}>
                <ViewCertificationsByProjectFinancialChart
                    filter={filter}
                    filterStartDate={filterStartDate}
                    filterEndDate={filterEndDate}
                    maxAmount={maxAmount}
                    maxAmendedAmount={maxAmendedAmount}
                    maxEndDate={maxEndDate}
                    maxAmendedEndDate={maxAmendedEndDate}
                />
            </TabPanel>
        </SectionCard>
    );
};

export default ViewCertificationsAnalysisContent;
