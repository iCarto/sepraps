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

const ProjectLocationSection = () => {
    const navigate = useNavigate();

    let project;
    [project] = useOutletContext();

    const headerActions = [
        <SectionCardHeaderAction
            key="navigate-to-location-subpage"
            name="navigate-to-location-subpage"
            text="Ir a la página de Ubicación"
            icon={<LaunchIcon />}
            onClick={() => {
                navigate(`location`);
            }}
        />,
    ];

    const providerInfo = (
        <SectionField label="Nombre del prestador:" value={project.provider?.name} />
    );

    const noProviderInfo = (
        <SectionField
            label="Nombre del prestador:"
            value="Este proyecto aún no tiene prestador"
            valueFontStyle="italic"
        />
    );

    const linkedLocalities = (
        <>
            <SectionLabel label="Localidades vinculadas:" />
            <Box pr={3}>
                <ProjectLinkedLocalitiesTable />
            </Box>
        </>
    );

    const noLinkedLocalities = (
        <SectionField
            label="Localidades vinculadas:"
            value="Este proyecto aún no tiene localidades vinculadas"
            valueFontStyle="italic"
        />
    );

    return (
        <SectionCard title="Ubicación" secondaryActions={headerActions}>
            <Grid container>
                <Grid item xs={12} lg={8}>
                    {project.provider ? providerInfo : noProviderInfo}
                    {project.linked_localities.length !== 0
                        ? linkedLocalities
                        : noLinkedLocalities}
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

export default ProjectLocationSection;
