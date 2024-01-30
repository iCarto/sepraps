import {useLocation, useNavigate} from "react-router-dom";

import {NumberUtil} from "base/format/utilities";
import {ImagePreview} from "base/image/components";
import {ProgressBarSmall} from "base/progress/components";
import {AppraisalChip} from "base/shared/components";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import {SectionCard} from "base/ui/section/components";

const BuildingComponentsSummaryList = ({bcMonitorings}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.split("/overview")[0];

    return (
        bcMonitorings && (
            <SectionCard title={`Componentes de obra (${bcMonitorings.length})`}>
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
                                            secondary={`— ${bcMonitoring.execution_status_label}`}
                                        />
                                        <Stack sx={{minWidth: "25%"}}>
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
                                        <Stack
                                            sx={{
                                                width: "5%",
                                                pl: 3,
                                                alignItems: "center",
                                            }}
                                        >
                                            <AppraisalChip
                                                label={
                                                    bcMonitoring.quality_status_label
                                                }
                                                value={bcMonitoring.quality_status}
                                                hideLabel
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
            </SectionCard>
        )
    );
};

export default BuildingComponentsSummaryList;
