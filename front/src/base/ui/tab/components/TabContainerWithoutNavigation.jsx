import {useState} from "react";

import {TabUtil} from "../utilities";

import {TabPanel} from ".";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";

const TabContainerWithoutNavigation = ({label, tabs}) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{width: "100%"}}>
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="secondary"
                aria-label={`${label}-tabs`}
            >
                {tabs.map((tab, index) => (
                    <Tab key={index} label={tab.label} {...TabUtil.a11yProps(index)} />
                ))}
            </Tabs>
            <Divider />
            {tabs.map((tab, index) => (
                <TabPanel
                    key={index}
                    value={tabValue}
                    index={index}
                    visible={tabValue === index}
                >
                    {tab.content}
                </TabPanel>
            ))}
        </Box>
    );
};

export default TabContainerWithoutNavigation;
