import {useEffect, useState} from "react";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {MilestoneService} from "service/api";

import {SidebarPanel} from "layout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {MilestoneSection} from "../presentational";

const ViewMilestonePanel = () => {
    const {milestoneId} = useParams();
    const navigate = useNavigate();
    let project;
    [project] = useOutletContext();

    const [milestone, setMilestone] = useState(null);

    useEffect(() => {
        MilestoneService.getMilestone(milestoneId).then(milestone => {
            console.log({milestone});
            setMilestone(milestone);
        });
    }, [milestoneId]);

    const handleClose = () => {
        navigate(`/projects/${project.id}/milestones`);
    };

    return (
        <SidebarPanel>
            <Box component="form" width="90%" margin={3}>
                <Grid container>
                    <Grid item xs={12} sx={{mb: 2}}>
                        <MilestoneSection milestone={milestone} />
                    </Grid>
                    <Grid container justifyContent="center" sx={{mt: 2}}>
                        <Button variant="contained" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </SidebarPanel>
    );
};

export default ViewMilestonePanel;
