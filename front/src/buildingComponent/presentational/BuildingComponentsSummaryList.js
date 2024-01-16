import {useLocation, useNavigate} from "react-router-dom";
import {theme} from "Theme";

import {NumberUtil} from "base/format/utilities";
import {ImagePreview} from "base/image/components";
import {ProgressBarSmall} from "base/progress/components";
import {AppraisalChip} from "base/shared/components";

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

const BuildingComponentsSummaryList = ({bcMonitorings}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.split("/overview")[0];

    return (
        bcMonitorings && (
            <Grid sx={{border: 1, borderColor: "lightgrey", borderRadius: 5, p: 4}}>
                <Typography
                    component="span"
                    variant="overline"
                    fontSize={16}
                    color={theme.palette.grey[600]}
                    lineHeight={1}
                >
                    Componentes de obra{" "}
                    <span style={{fontWeight: 800}}>({bcMonitorings.length})</span>
                </Typography>
                <List sx={{m: 0}}>
                    {bcMonitorings.map(bcMonitoring => {
                        return (
                            <>
                                <ListItem
                                    key={bcMonitoring.id}
                                    onClick={() =>
                                        navigate(`${basePath}/${bcMonitoring.id}`)
                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ImagePreview
                                                    path={bcMonitoring.featured_image}
                                                    alt={bcMonitoring.name}
                                                    width="50px"
                                                    height="50px"
                                                />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            id={`building-components-summary-${bcMonitoring.code}`}
                                            primary={
                                                <Typography
                                                    sx={{display: "inline"}}
                                                    component="span"
                                                    fontWeight={600}
                                                >
                                                    {bcMonitoring.name}{" "}
                                                </Typography>
                                            }
                                            secondary={
                                                <>
                                                    <Typography
                                                        sx={{display: "inline"}}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {bcMonitoring.location}
                                                    </Typography>
                                                    —{" "}
                                                    {
                                                        bcMonitoring.execution_status_label
                                                    }
                                                </>
                                            }
                                        />
                                        <Stack sx={{width: "30%"}}>
                                            <ProgressBarSmall
                                                label="Avance financiero"
                                                progressValue={NumberUtil.parseInteger(
                                                    bcMonitoring.financial_progress_percentage
                                                )}
                                                progressStyle={{mb: 1}}
                                            />
                                            <ProgressBarSmall
                                                label="Avance físico"
                                                progressValue={NumberUtil.parseInteger(
                                                    bcMonitoring.physical_progress_percentage
                                                )}
                                            />
                                        </Stack>
                                        <Stack sx={{width: "12%", pl: 3}}>
                                            <AppraisalChip
                                                label={
                                                    bcMonitoring.quality_status_label
                                                }
                                                value={bcMonitoring.quality_status}
                                            />
                                        </Stack>
                                    </ListItemButton>
                                </ListItem>
                                <Divider
                                    variant="middle"
                                    component="li"
                                    sx={{my: 0.5}}
                                />
                            </>
                        );
                    })}
                </List>
            </Grid>
        )
    );
};

export default BuildingComponentsSummaryList;
