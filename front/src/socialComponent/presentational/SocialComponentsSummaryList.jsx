import {useLocation, useNavigate} from "react-router-dom";

import {NumberUtil} from "base/format/utilities";

import {ProgressBarSmall} from "base/progress/components";
import {AppraisalChip, CollapsableListItem} from "base/shared/components";
import {SocialComponentTrainingsSummaryTable} from ".";
import {LightHeading} from "base/ui/headings/components";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";

const SocialComponentsSummaryList = ({socialComponents}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname.split("/overview")[0];

    return (
        socialComponents && (
            <Grid sx={{border: 1, borderColor: "lightgrey", borderRadius: 5, p: 4}}>
                <LightHeading>
                    Componentes sociales{" "}
                    <span style={{fontWeight: 800}}>({socialComponents.length})</span>
                </LightHeading>
                <List sx={{m: 0}}>
                    {socialComponents.map((component, index) => {
                        return (
                            <div key={index}>
                                <ListItem disableGutters sx={{py: 0}}>
                                    <CollapsableListItem
                                        accordionSummary={
                                            <ListItemButton
                                                sx={{ml: 0}}
                                                onClick={() =>
                                                    navigate(
                                                        `${basePath}/list/${component.id}`
                                                    )
                                                }
                                            >
                                                <ListItemText
                                                    id={`${component.code}-summary`}
                                                    primary={
                                                        <Typography fontWeight={600}>
                                                            {component.name}
                                                        </Typography>
                                                    }
                                                    secondary={`— ${component.execution_status_label}`}
                                                    sx={{width: "60%"}}
                                                />
                                                <Stack
                                                    sx={{width: "30%", pb: 2, px: 3}}
                                                >
                                                    <ProgressBarSmall
                                                        label="Avance"
                                                        progressValue={NumberUtil.formatDecimalWithoutZeros(
                                                            component.progress_percentage
                                                        )}
                                                    />
                                                </Stack>
                                                <Stack sx={{width: "10%"}}>
                                                    <AppraisalChip
                                                        label={
                                                            component.quality_status_label
                                                        }
                                                        value={component.quality_status}
                                                    />
                                                </Stack>
                                            </ListItemButton>
                                        }
                                    >
                                        {component.trainings.length ? (
                                            <Box px={2} py={1}>
                                                <SocialComponentTrainingsSummaryTable
                                                    trainings={component.trainings}
                                                />
                                            </Box>
                                        ) : (
                                            <Alert severity="info">
                                                No hay actividades para mostrar.
                                            </Alert>
                                        )}
                                    </CollapsableListItem>
                                </ListItem>
                                <Divider component="li" sx={{mb: 1}} />
                            </div>
                        );
                    })}
                </List>
            </Grid>
        )
    );
};

export default SocialComponentsSummaryList;
