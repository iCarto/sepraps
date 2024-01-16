import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {useTabLogic} from "../hooks";
import {TabUtil} from "../utilities";

import {TabPanel} from ".";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";

const TabContainer = ({tabs}) => {
    const {tabIndex, handleChangeTab} = useTabLogic();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentTabPath = location.pathname.split("/").slice(-1)[0];
        const currentTabIndex = tabs.findIndex(tab => tab.path === currentTabPath);

        handleChangeTab(null, currentTabIndex);
    }, [location.pathname]);

    const handleClickTab = path => {
        navigate(path);
    };

    return (
        <Box sx={{width: "100%"}}>
            <Tabs value={tabIndex} onChange={handleChangeTab} aria-label="tabs">
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.label}
                        {...TabUtil.a11yProps(index)}
                        onClick={tab.path ? () => handleClickTab(tab.path) : null}
                    />
                ))}
            </Tabs>
            <Divider />
            {tabs.map((tab, index) => (
                <TabPanel key={index} index={index} visible={tabIndex === index}>
                    {tab.content}
                </TabPanel>
            ))}
        </Box>
    );
};

export default TabContainer;
