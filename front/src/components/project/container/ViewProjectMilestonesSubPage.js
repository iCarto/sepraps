import {useEffect, useState} from "react";
import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {ProjectService} from "service/api";
import {useNavigateWithReload} from "hooks";

import {SubPageLayout} from "layout";
import {AlertError, SectionCard} from "components/common/presentational";
import {MilestonePhase} from "components/milestone/presentational";
import {CloseProjectButton, CloseProjectDialog} from ".";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const findActiveMilestone = milestones => {
    for (let milestone of milestones) {
        if (!milestone["compliance_date"]) {
            return milestone;
        }
    }
};

const ViewProjectMilestonesSubPage = () => {
    const {id} = useParams();
    const location = useLocation();
    let project;
    [project] = useOutletContext();

    const navigate = useNavigateWithReload();

    const [milestonesPhases, setMilestonesPhases] = useState([]);
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [isCloseProjectDialogOpen, setIsCloseProjectDialogOpen] = useState(false);
    const [error, setError] = useState("");

    const getIsSidePanelOpen = isOpen => {
        setIsSidePanelOpen(isOpen);
    };

    const openDialog = () => {
        setIsCloseProjectDialogOpen(true);
    };

    useEffect(() => {
        ProjectService.getProjectMilestones(id)
            .then(milestonesPhases => {
                console.log({milestonesPhases});
                setMilestonesPhases(milestonesPhases);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }, [id, location.state?.lastRefreshDate]);

    const activeMilestone = findActiveMilestone(
        milestonesPhases.map(phase => phase["milestones"]).flat()
    );

    let allMilestonesCompleted = project.milestones.every(milestone => {
        return milestone.compliance_date !== null;
    });

    const handleCloseProject = () => {
        ProjectService.closeProject(project.id)
            .then(() => {
                navigate(`/projects/${project.id}/milestones`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
        setIsCloseProjectDialogOpen(false);
    };

    return (
        <SubPageLayout
            outletContext={[project]}
            getIsSidePanelOpen={getIsSidePanelOpen}
            isSidePanelOpen={isSidePanelOpen}
        >
            <Grid container spacing={3}>
                <AlertError error={error} />
                <Grid item xs={12}>
                    <SectionCard title="Hitos del proyecto">
                        {milestonesPhases.map(phase => {
                            return (
                                <MilestonePhase
                                    key={phase.code}
                                    phase={phase}
                                    activeMilestone={activeMilestone}
                                />
                            );
                        })}
                    </SectionCard>
                    <Box display="flex" justifyContent="right" my={3}>
                        <CloseProjectButton
                            allMilestonesCompleted={allMilestonesCompleted}
                            projectIsClosed={project.closed}
                            openDialog={openDialog}
                        />
                    </Box>
                </Grid>
                <CloseProjectDialog
                    onClosure={handleCloseProject}
                    isDialogOpen={isCloseProjectDialogOpen}
                    setIsDialogOpen={setIsCloseProjectDialogOpen}
                />
            </Grid>
        </SubPageLayout>
    );
};

export default ViewProjectMilestonesSubPage;
