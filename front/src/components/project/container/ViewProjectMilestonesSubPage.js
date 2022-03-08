import {useEffect, useState} from "react";
import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {ProjectService} from "service/api";

import {SubPageLayout} from "layout";
import {SectionCard} from "components/common/presentational";
import Grid from "@mui/material/Grid";
import {MilestonePhase} from "components/milestone/presentational";

const findActiveMilestone = milestones => {
    let activeMilestone = null;
    console.log({milestones});
    for (let milestone of milestones) {
        console.log({milestone});
        if (milestone["children"].length) {
            activeMilestone = findActiveMilestone(milestone["children"]);
            if (activeMilestone) {
                return activeMilestone;
            }
        }
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

    const [milestonesPhases, setMilestonesPhases] = useState([]);

    useEffect(() => {
        ProjectService.getProjectMilestones(id).then(milestonesPhases => {
            console.log({milestonesPhases});
            setMilestonesPhases(milestonesPhases);
        });
    }, [id, location.state?.lastRefreshDate]);

    const activeMilestone = findActiveMilestone(
        milestonesPhases.map(phase => phase["milestones"]).flat()
    );

    return (
        <SubPageLayout outletContext={[project]}>
            <Grid container spacing={3}>
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
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewProjectMilestonesSubPage;
