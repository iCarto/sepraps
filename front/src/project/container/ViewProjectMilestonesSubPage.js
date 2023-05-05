import {useEffect, useState} from "react";
import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {ProjectService} from "project/service";
import {useAuth} from "base/user/provider";
import {AuthAction} from "base/user/components";
import {useNavigateWithReload} from "base/navigation/hooks";

import {EntityViewSubPage} from "base/entity/pages";
import {SectionCard} from "base/section/components";
import {MilestonePhase} from "milestone/presentational";
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
    const {id: projectId} = useParams();
    const location = useLocation();
    let project;
    [project] = useOutletContext();

    const {ROLES, hasRole} = useAuth();

    const navigate = useNavigateWithReload();

    const [milestonesPhases, setMilestonesPhases] = useState([]);
    const [isCloseProjectDialogOpen, setIsCloseProjectDialogOpen] = useState(false);
    const [error, setError] = useState("");

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

    let allMilestonesCompleted = project?.milestones?.every(milestone => {
        return milestone?.compliance_date !== null;
    });

    const handleCloseProject = () => {
        ProjectService.closeProject(project?.id)
            .then(() => {
                navigate(`/projects/${project?.id}/milestones`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
        setIsCloseProjectDialogOpen(false);
    };

    const isButtonDisabled = () => {
        const isSupervisor = hasRole(ROLES.SUPERVISION);
        const isManager = hasRole(ROLES.MANAGEMENT);
        if (isSupervisor) {
            return !!project?.closed;
        } else if (isManager) {
            return !allMilestonesCompleted || project?.closed;
        }
    };

    const milestonesSection = [
        <>
            <Grid item xs={12}>
                <SectionCard title="Hitos del proyecto">
                    {milestonesPhases.map(phase => {
                        return (
                            <MilestonePhase
                                key={phase.code}
                                phase={phase}
                                activeMilestone={activeMilestone}
                                isProjectClosed={project?.closed}
                            />
                        );
                    })}
                </SectionCard>
                <Box display="flex" justifyContent="right" my={3}>
                    <AuthAction roles={[ROLES.MANAGEMENT, ROLES.SUPERVISION]}>
                        <CloseProjectButton
                            isButtonDisabled={isButtonDisabled()}
                            isProjectClosed={project?.closed}
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
        </>,
    ];

    return project && <EntityViewSubPage sections={milestonesSection} error={error} />;
};

export default ViewProjectMilestonesSubPage;
