import {useEffect, useState} from "react";
import {PageLayout} from "layout";

import Grid from "@mui/material/Grid";
import {MapStats} from "components/common/geo";
import {ProjectService} from "service/api";

const StatsPage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        ProjectService.getProjectsForStats().then(projects => {
            console.log("projects", projects);
            setProjects(projects);
        });
    }, []);

    return (
        <PageLayout>
            <Grid
                container
                sx={{mb: 4}}
                spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <MapStats projects={projects} />
            </Grid>
        </PageLayout>
    );
};

export default StatsPage;
