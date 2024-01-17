import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {useTabLogic} from "../hooks";
import {TabUtil} from "../utilities";
import {RouterUtil} from "base/navigation/utilities";

import {TabPanel} from ".";
import {AlertError} from "base/error/components";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";

const TabContainer = ({tabs, error = ""}) => {
    const {tabIndex, handleChangeTab} = useTabLogic();

    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = RouterUtil.getLastUrlSegment(location);
    const currentTabIndex = tabs.findIndex(
        tab => tab.path === currentPath || tab.pathsForIndex?.includes(currentPath)
    );

    useEffect(() => {
        handleChangeTab(null, currentTabIndex);
    }, [currentPath, currentTabIndex]);

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
            <AlertError error={error} />
            {tabs.map((tab, index) => (
                <TabPanel key={index} index={index} visible={tabIndex === index}>
                    {tab.content}
                </TabPanel>
            ))}
        </Box>
    );
};

export default TabContainer;
