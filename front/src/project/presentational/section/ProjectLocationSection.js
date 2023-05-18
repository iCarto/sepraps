import {useNavigate} from "react-router-dom";

import {FieldUtil} from "base/ui/section/utilities";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
    SectionLabel,
} from "base/ui/section/components";

import {MapInfrastructure} from "base/map/components";
import {ProjectLinkedLocalitiesTable} from "../location";

import Grid from "@mui/material/Grid";
import LaunchIcon from "@mui/icons-material/Launch";

const ProjectLocationSection = ({project}) => {
    const navigate = useNavigate();

    const headerActions = [
        <SectionCardHeaderAction
            key="navigate-to-location-subpage"
            name="navigate-to-location-subpage"
            text="Ir a la página de Ubicación"
            icon={<LaunchIcon />}
            onClick={() => {
                navigate(`/projects/${project.id}/location`);
            }}
        />,
    ];

    const linkedLocalities = (
        <>
            <SectionLabel label="Localidades vinculadas" />
            <ProjectLinkedLocalitiesTable localities={project?.linked_localities} />
        </>
    );

    const noLinkedLocalitiesMessage = (
        <SectionField
            label="Localidades vinculadas"
            value="Este proyecto no tiene localidades vinculadas"
            valueCustomStyle={{fontStyle: "italic"}}
        />
    );

    return (
        <SectionCard title="Ubicación" secondaryActions={headerActions}>
            <Grid container columnSpacing={4}>
                <Grid item xs={12} mb={3}>
                    <SectionField
                        label="Prestador"
                        value={FieldUtil.getValue(project?.provider?.name)}
                        linkPath={
                            project?.provider
                                ? `/providers/${project.provider.id}/summary`
                                : null
                        }
                    />
                </Grid>
                <Grid item container xs={12} lg={4}>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            mt: {xs: 3, lg: 0},
                        }}
                    >
                        <SectionLabel label="Infraestructura principal" />
                    </Grid>
                    <Grid item xs={12}>
                        <MapInfrastructure
                            infrastructure={{
                                latitude: project?.main_infrastructure.latitude,
                                longitude: project?.main_infrastructure.longitude,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={8}>
                    {project?.linked_localities?.length
                        ? linkedLocalities
                        : noLinkedLocalitiesMessage}
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default ProjectLocationSection;
