import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {SectionCard} from "base/ui/section/components";
import {
    ViewSocialComponentsTrainingsChart,
    ViewSocialComponentsTrainingsTotalsTab,
} from ".";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs/Tabs";
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

const ViewSocialComponentsAnalysisSubPage = () => {
    let project;
    [project] = useOutletContext();

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        setTabValue(0);
    }, [project]);

    return (
        <SectionCard title="Supervisión de componentes sociales">
            {project ? (
                <>
                    <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            aria-label="tab-social-components-analysis"
                        >
                            <Tab label="Tabla" {...a11yProps(0)} />
                            <Tab label="Gráfico" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={tabValue} index={0}>
                        <ViewSocialComponentsTrainingsTotalsTab
                            filter={{project: project.id}}
                        />
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <ViewSocialComponentsTrainingsChart
                            filter={{project: project.id}}
                        />
                    </TabPanel>
                </>
            ) : null}
        </SectionCard>
    );
};

export default ViewSocialComponentsAnalysisSubPage;
