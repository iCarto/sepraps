import {Fragment} from "react";
import {useNavigate} from "react-router-dom";

import {NumberUtil} from "base/format/utilities";
import {ImagePreview} from "base/image/components";
import {ProgressBarSmall} from "base/progress/components";
import {LightHeading} from "base/ui/headings/components";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

const ProjectsBuildingAnalysisSummaryList = ({projects}) => {
    const navigate = useNavigate();

    return (
        projects && (
            <Grid sx={{border: 1, borderColor: "lightgrey", borderRadius: 5, p: 4}}>
                <LightHeading>
                    Proyectos <span style={{fontWeight: 800}}>({projects.length})</span>
                </LightHeading>
                <List sx={{m: 0}}>
                    {projects.map(project => {
                        return (
                            <Fragment key={project.id}>
                                <ListItem
                                    onClick={() =>
                                        navigate(`/projects/list/${project.id}`)
                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ImagePreview
                                                    path={project.featured_image}
                                                    alt={project.name}
                                                    width="50px"
                                                    height="50px"
                                                />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            id={`project-summary-${project.code}`}
                                            primary={
                                                <Typography
                                                    sx={{display: "inline"}}
                                                    component="span"
                                                    fontWeight={600}
                                                >
                                                    {project.name}{" "}
                                                </Typography>
                                            }
                                            secondary={`— ${project.code}`}
                                        />
                                        <Stack sx={{minWidth: "30%"}}>
                                            <ProgressBarSmall
                                                label="Avance financiero"
                                                progressValue={NumberUtil.parseInteger(
                                                    project.financial_progress_percentage
                                                )}
                                                progressStyle={{mb: 1}}
                                            />
                                            <ProgressBarSmall
                                                label="Avance físico"
                                                progressValue={NumberUtil.parseInteger(
                                                    project.physical_progress_percentage
                                                )}
                                            />
                                        </Stack>
                                    </ListItemButton>
                                </ListItem>
                                <Divider
                                    variant="middle"
                                    component="li"
                                    sx={{my: 0.5}}
                                />
                            </Fragment>
                        );
                    })}
                </List>
            </Grid>
        )
    );
};

export default ProjectsBuildingAnalysisSummaryList;
