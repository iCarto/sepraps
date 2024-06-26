import {useNavigate} from "react-router-dom";

import {
    SectionBox,
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
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
                navigate(`/projects/list/${project.id}/location`);
            }}
        />,
    ];

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
                <Grid item container xs={12} lg={4}>
                    <SectionBox label="Infraestructura principal">
                        <MapInfrastructure
                            infrastructure={{
                                latitude: project?.main_infrastructure.latitude,
                                longitude: project?.main_infrastructure.longitude,
                            }}
                        />
                    </SectionBox>
                </Grid>
                <Grid item xs={12} lg={8}>
                    <SectionBox label="Localidades vinculadas">
                        {project?.linked_localities?.length ? (
                            <ProjectLinkedLocalitiesTable
                                localities={project?.linked_localities}
                            />
                        ) : (
                            noLinkedLocalitiesMessage
                        )}
                    </SectionBox>
                </Grid>
            </Grid>
        </SectionCard>
    );
};

export default ProjectLocationSection;
