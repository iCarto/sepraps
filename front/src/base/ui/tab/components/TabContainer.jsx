import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import {TabUtil} from "../utilities";
import {useTabLogic} from "../hooks";

import {TabPanel} from ".";
import {AlertError} from "base/error/components";

import styled from "@mui/material/styles/styled";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";

const StyledTab = styled(Tab)({
    borderRight: "1px solid #eaeaea",
    "&.Mui-selected": {
        backgroundColor: "white",
    },
});

const TabContainer = ({tabs, basePath, info = null, error = null}) => {
    const {tabIndex, handleChangeTab} = useTabLogic();

    const navigate = useNavigate();
    const location = useLocation();

    const currentTabIndex = tabs.findIndex(tab =>
        location.pathname.startsWith(`${basePath}/${tab.path}`)
    );

    useEffect(() => {
        handleChangeTab(null, currentTabIndex);
    }, [location.pathname, currentTabIndex]);

    const handleClickTab = path => {
        navigate(path);
    };

    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <Grid
                container
                sx={{
                    backgroundColor: "grey.100",
                }}
            >
                <Grid item flexGrow={1}>
                    <Tabs value={tabIndex} onChange={handleChangeTab} aria-label="tabs">
                        {tabs.map((tab, index) => (
                            <StyledTab
                                key={index}
                                label={tab.label}
                                {...TabUtil.a11yProps(index)}
                                onClick={
                                    tab.path ? () => handleClickTab(tab.path) : null
                                }
                            />
                        ))}
                    </Tabs>
                </Grid>
                {info && (
                    <Grid
                        item
                        xs
                        container
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{
                            px: 2,
                            borderLeft: 1,
                            borderColor: "grey.200",
                            backgroundColor: "white",
                        }}
                    >
                        {info}
                    </Grid>
                )}
            </Grid>
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
