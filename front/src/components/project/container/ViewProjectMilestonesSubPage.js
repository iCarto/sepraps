import {useEffect, useState} from "react";
import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {ProjectService} from "service/api";
import {AuthAction, useAuth} from "auth";
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
    const {projectId} = useParams();
    const location = useLocation();
    let project;
    [project] = useOutletContext();

    const {ROLES, hasRole} = useAuth();

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
        ProjectService.getProjectMilestones(projectId)
            .then(milestonesPhases => {
                console.log({milestonesPhases});
                setMilestonesPhases(milestonesPhases);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }, [projectId, location.state?.lastRefreshDate]);

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

    const isBtnDisabled = () => {
        const isSupervisor = hasRole(ROLES.SUPERVISION);
        const isManager = hasRole(ROLES.MANAGEMENT);
        if (isSupervisor) {
            return !!project.closed;
        } else if (isManager) {
            return !allMilestonesCompleted || project.closed;
        }
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
                                    isProjectClosed={project.closed}
                                />
                            );
                        })}
                    </SectionCard>
                    <Box display="flex" justifyContent="right" my={3}>
                        <AuthAction roles={[ROLES.MANAGEMENT, ROLES.SUPERVISION]}>
                            <CloseProjectButton
                                isBtnDisabled={isBtnDisabled()}
                                isProjectClosed={project.closed}
                                openDialog={openDialog}
                            />
                        </AuthAction>
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
