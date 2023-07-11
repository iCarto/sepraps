import {useState} from "react";
import {useOutletContext, Link as RouterLink} from "react-router-dom";

import {FieldReportProjectsTabPanels} from ".";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const FieldReportProjectsSection = () => {
    const [value, setValue] = useState(0);

    let fieldReport;
    [fieldReport] = useOutletContext();

    const contracts = new Set();
    fieldReport.field_report_projects.map(project => contracts.add(project.contract));

    function a11yProps(id) {
        return {
            id: `tab-${id}`,
            "aria-controls": `tabpanel-${id}`,
        };
    }

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const indexForNewTab = fieldReport?.field_report_projects?.length;

    const getTabLabel = project => (
        <Grid>
            <Typography sx={{fontSize: "14px", fontWeight: "500"}}>
                {project.name}
            </Typography>
            <Typography sx={{fontSize: "12px"}}>
                {project.construction_contract_number}
            </Typography>
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
                    {fieldReport?.field_report_projects?.length
                        ? fieldReport.field_report_projects?.map((project, index) => (
                              <Tab
                                  key={index}
                                  component={RouterLink}
                                  to={{
                                      pathname: `${project.id}`,
                                  }}
                                  label={getTabLabel(project)}
                                  {...a11yProps(project.id)}
                                  value={index}
                              />
                          ))
                        : null}
                    <Tab
                        key={indexForNewTab}
                        id="tab-nuevo"
                        component={RouterLink}
                        to={{
                            pathname: `new`,
                        }}
                        aria-controls="tabpanel-nuevo"
                        label={<AddIcon />}
                        sx={{minWidth: "48px"}}
                    />
                </Tabs>
            </Box>
            <FieldReportProjectsTabPanels
                projects={fieldReport?.field_report_projects}
                value={value}
            />
        </Paper>
    );
};

export default FieldReportProjectsSection;
