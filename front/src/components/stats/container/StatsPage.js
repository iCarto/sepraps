import {useEffect, useState} from "react";
import {PageLayout} from "layout";

import Grid from "@mui/material/Grid";
import {MapStats} from "components/common/geo";
import {ProjectService} from "service/api";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

const MarkerDiv = styled("div")(({phase, theme}) => ({
    width: "15px",
    height: "15px",
    display: "block",
    position: "relative",
    borderRadius: "15px 15px 0",
    transform: "rotate(45deg)",
    border: "1px solid #FFFFFF",
    backgroundColor: `${theme.palette[phase].main}`,
}));

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
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{flexWrap: "nowrap", p: 1}}
            >
                {[
                    {
                        code: "design",
                        name: "Diseño",
                    },
                    {
                        code: "contracting",
                        name: "Contratación",
                    },
                    {
                        code: "execution",
                        name: "Ejecución",
                    },
                    {
                        code: "post-execution",
                        name: "Post-Construcción",
                    },
                ].map(phase => {
                    return (
                        <Grid
                            item
                            container
                            direction="row"
                            justifyContent="center"
                            spacing={2}
                        >
                            <MarkerDiv phase={phase.code} />
                            <Typography
                                sx={{textTransform: "uppercase", ml: 1}}
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                {phase.name}
                            </Typography>
                        </Grid>
                    );
                })}
            </Grid>
            <MapStats projects={projects} />
        </PageLayout>
    );
};

export default StatsPage;
