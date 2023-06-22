import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {TabPanel} from "base/ui/tab";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

const FieldReportProjectsSection = ({fieldReport}) => {
    const [value, setValue] = useState(0);

    const navigate = useNavigate();

    const handleClickView = projectIndex => {
        console.log("view", projectIndex);
        navigate(`/field-reports/1/activities`);
    };

    const handleClickEdit = projectIndex => {
        console.log("edit", projectIndex);
        navigate(`edit/${projectIndex}`);
    };

    const handleClickDelete = projectIndex => {
        console.log("delete", projectIndex);
    };

    const contracts = new Set();
    fieldReport.visited_projects.map(project => contracts.add(project.contract));

    function a11yProps(name) {
        return {
            id: `tab-${name}`,
            "aria-controls": `tabpanel-${name}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Paper sx={{width: "100%"}}>
                <>
                    {fieldReport.visited_projects?.length ? (
                        <>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    aria-label="pestañas de proyectos"
                                >
                                    {fieldReport.visited_projects?.map(
                                        (project, index) => (
                                            <Tab
                                                key={index}
                                                label={project.locality}
                                                {...a11yProps(project.locality)}
                                            />
                                        )
                                    )}
                                    <Tab
                                        key={fieldReport.visited_projects?.length + 1}
                                        label={<AddIcon />}
                                        sx={{minWidth: "48px"}}
                                        {...a11yProps(
                                            fieldReport.visited_projects?.length + 1
                                        )}
                                    />
                                </Tabs>
                            </Box>
                            {fieldReport.visited_projects?.map((project, index) => (
                                <TabPanel key={index} value={value} index={index}>
                                    <Typography
                                        variant="h5"
                                        component="h2"
                                        fontWeight="500"
                                    >
                                        {`${project.locality}`}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {`${project.code} | ${project.district} (${project.department})`}
                                    </Typography>
                                    <Typography
                                        variant="overline"
                                        display="block"
                                        mt={3}
                                    >
                                        Antecedentes
                                    </Typography>
                                    <Typography variant="body1" color="text.primary">
                                        {project.history}
                                    </Typography>
                                    <Typography
                                        variant="overline"
                                        display="block"
                                        mt={3}
                                    >
                                        Actividades realizadas
                                    </Typography>
                                </TabPanel>
                            ))}
                        </>
                    ) : (
                        <Stack alignItems="center" spacing={3}>
                            <Typography sx={{fontStyle: "italic"}}>
                                No se ha definido ningún proyecto visitado para este
                                informe.
                            </Typography>
                        </Stack>
                    )}
                </>
            </Paper>
        </>
    );
};

export default FieldReportProjectsSection;
