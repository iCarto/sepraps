import {useState} from "react";

import {FieldReportProjectsTabPanels} from ".";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const FieldReportProjectsSection = ({fieldReport}) => {
    const [value, setValue] = useState(0);

    const contracts = new Set();
    fieldReport.visited_projects.map(project => contracts.add(project.contract));

    function a11yProps(name) {
        return {
            id: `tab-${name}`,
            "aria-controls": `tabpanel-${name}`,
        };
    }

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const indexForNewTab = fieldReport?.visited_projects?.length;

    const getTabLabel = project => (
        <Grid>
            <Typography sx={{fontSize: "14px", fontWeight: "500"}}>
                {project.locality}
            </Typography>
            <Typography sx={{fontSize: "12px"}}>{project.contract}</Typography>
        </Grid>
    );

    return (
        <Paper sx={{width: "100%", pb: 1}}>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                <Tabs
                    value={value}
                    onChange={handleChangeTab}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="pestañas de proyectos"
                >
                    {fieldReport?.visited_projects?.length
                        ? fieldReport.visited_projects?.map((project, index) => (
                              <Tab
                                  key={index}
                                  label={getTabLabel(project)}
                                  {...a11yProps(project.locality)}
                              />
                          ))
                        : null}
                    <Tab
                        key={indexForNewTab}
                        id="tab-nuevo"
                        aria-controls="tabpanel-nuevo"
                        label={<AddIcon />}
                        sx={{minWidth: "48px"}}
                    />
                </Tabs>
            </Box>
            <FieldReportProjectsTabPanels
                projects={fieldReport?.visited_projects}
                value={value}
            />
        </Paper>
    );
};

export default FieldReportProjectsSection;
