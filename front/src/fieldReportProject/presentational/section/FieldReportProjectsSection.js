import {useEffect, useState} from "react";
import {
    useOutletContext,
    Link as RouterLink,
    useParams,
    useNavigate,
} from "react-router-dom";

import {FieldReportProjectsTabPanels} from ".";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {UserAuthRequired} from "base/user/utilities";

const FieldReportProjectsSection = () => {
    const navigate = useNavigate();
    const {fieldReportProjectId} = useParams();
    const [activeTabId, setActiveTabId] = useState(-1);

    let fieldReport;
    [fieldReport] = useOutletContext();

    const contracts = new Set();
    fieldReport.field_report_projects.map(project => contracts.add(project.contract));

    function a11yProps(projectId) {
        return {
            id: `tab-${projectId}`,
            "aria-controls": `tabpanel-${projectId}`,
        };
    }

    useEffect(() => {
        if (fieldReportProjectId) {
            fieldReportProjectId === "new"
                ? setActiveTabId(-1)
                : setActiveTabId(parseInt(fieldReportProjectId));
        } else {
            if (fieldReport?.field_report_projects?.length) {
                navigate(
                    `/field-reports/list/${fieldReport.id}/projects/${fieldReport.field_report_projects[0].id}`
                );
            } else {
                setActiveTabId(-1);
            }
        }
    }, [fieldReportProjectId]);

    const handleChangeTab = (event, newValue) => {
        setActiveTabId(newValue);
    };

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
                    value={activeTabId}
                    onChange={handleChangeTab}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="pestañas de proyectos"
                >
                    {fieldReport?.field_report_projects?.length
                        ? fieldReport.field_report_projects?.map(fieldReportProject => {
                              return (
                                  <Tab
                                      key={fieldReportProject.id}
                                      component={RouterLink}
                                      to={{
                                          pathname: `${fieldReportProject.id}`,
                                      }}
                                      label={getTabLabel(fieldReportProject)}
                                      {...a11yProps(fieldReportProject.id)}
                                      value={fieldReportProject.id}
                                  />
                              );
                          })
                        : null}
                    <UserAuthRequired user={fieldReport.created_by}>
                        <Tab
                            key={0}
                            value={-1}
                            id="tab-nuevo"
                            component={RouterLink}
                            to={{
                                pathname: `new`,
                            }}
                            aria-controls="tabpanel-nuevo"
                            label={<AddIcon />}
                            sx={{minWidth: "48px"}}
                        />
                    </UserAuthRequired>
                </Tabs>
            </Box>
            <FieldReportProjectsTabPanels
                fieldReport={fieldReport}
                activeTabId={activeTabId}
            />
        </Paper>
    );
};

export default FieldReportProjectsSection;
