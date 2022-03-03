import {useNavigate, useOutletContext} from "react-router-dom";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
    SectionLabel,
} from "components/common/presentational";
import {ProjectLinkedLocalitiesTable} from "../location";
import {Map} from "components/common/geo";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";

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
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar infraestructura"
            icon={<EditIcon />}
            onClick={() => {
                navigate("location/edit");
            }}
        />,
    ];

    return (
        <SectionCard title="Ubicación" secondaryActions={headerActions}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={8}>
                    <SectionField
                        label="Nombre del prestador:"
                        value={project.provider.name}
                    />
                    <SectionLabel label="Localidades vinculadas:" />
                    <Box pr={3}>
                        <ProjectLinkedLocalitiesTable />
                    </Box>
                </Grid>
                <Grid item container xs={12} lg={4}>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            mt: {xs: 3, lg: 0},
                        }}
                    >
                        <SectionLabel label="Infraestructura principal:" />
                    </Grid>
                    <Grid item xs={12}>
                        <Map
                            markerPosition={{
                                lat: project.main_infrastructure.latitude,
                                lng: project.main_infrastructure.longitude,
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </SectionCard>
    );
};
{
}

export default ProjectLocationSection;
