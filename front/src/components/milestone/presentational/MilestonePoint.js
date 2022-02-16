import {Fragment} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {DateUtil} from "utilities";

import Chip from "@mui/material/Chip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const MilestonePoint = ({milestone, level, isActiveMilestone = false}) => {
    const navigate = useNavigate();
    let project;
    [project] = useOutletContext();

    const handleClick = () => {
        if (isActiveMilestone) {
            navigate(`/projects/${project.id}/milestones/${milestone.id}/edit`);
        } else {
            navigate(`/projects/${project.id}/milestones/${milestone.id}`);
        }
    };

    return (
        <Grid
            container
            key={milestone.category}
            alignItems="center"
            spacing={2}
            justifyContent="space-between"
        >
            <Grid item>
                <Chip
                    sx={{ml: level * 6}}
                    label={milestone.category_name}
                    color={
                        milestone.compliance_date || isActiveMilestone
                            ? "primary"
                            : "default"
                    }
                    variant={!milestone.compliance_date ? "outlined" : "filled"}
                    icon={milestone.compliance_date ? <CheckCircleIcon /> : null}
                    onClick={handleClick}
                    disabled={!milestone.compliance_date && !isActiveMilestone}
                />
            </Grid>
            {milestone.compliance_date && (
                <Fragment>
                    <Grid item xs>
                        <Divider />
                    </Grid>
                    <Grid item xs={3} container alignItems="center">
                        <EventAvailableIcon fontSize="small" />
                        <Typography component="span" size="small" sx={{ml: 1}}>
                            {DateUtil.formatDate(milestone.compliance_date)}
                        </Typography>
                    </Grid>
                </Fragment>
            )}
        </Grid>
    );
};

export default MilestonePoint;
