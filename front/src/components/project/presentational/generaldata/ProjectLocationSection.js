import {useNavigate, useOutletContext} from "react-router-dom";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
    SectionLabel,
} from "components/common/presentational";
import {ProjectLinkedLocalitiesTable} from "../location";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LaunchIcon from "@mui/icons-material/Launch";

const ProjectLocationSection = () => {
    const navigate = useNavigate();

    let project;
    [project] = useOutletContext();

    const headerActions = [
        <SectionCardHeaderAction
            key="go-to-location-subpage"
            name="go-to-location-subpage"
            text="Ir a la página de Ubicación"
            icon={<LaunchIcon />}
            onClick={() => {
                navigate(`location`);
            }}
        />,
    ];

    return (
        <SectionCard title="Ubicación" secondaryActions={headerActions}>
            <Grid container>
                <Grid item xs={12} lg={7}>
                    <SectionField
                        label="Nombre del prestador:"
                        value={project.provider.name}
                    />
                    <SectionLabel label="Localidades vinculadas:" />
                    <Box pr={3}>
                        <ProjectLinkedLocalitiesTable />
                    </Box>
                </Grid>
                <Grid item container xs={12} lg={5}>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            mt: {xs: 3, lg: 0},
                        }}
                    >
                        <SectionLabel label="Infraestructura principal:" />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            backgroundImage:
                                "url(https://via.placeholder.com/300x120/a9dec3/FFFFFF/?text=Map-placeholder)",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: 1,
                            minHeight: 200,
                        }}
                    />
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default ProjectLocationSection;
