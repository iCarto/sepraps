import {useNavigate, useOutletContext} from "react-router-dom";
import {useAuth} from "auth";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import {MapInfraestructure} from "components/common/geo";
import EditIcon from "@mui/icons-material/Edit";

const ProjectInfrastructureSection = ({isSidePanelOpen = null}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    let project;
    [project] = useOutletContext();

    const headerActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("main_infrastructure/edit");
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT]}
        />,
    ];

    return (
        <SectionCard title="Infraestructura principal" secondaryActions={headerActions}>
            <MapInfraestructure
                infraestructure={{
                    latitude: project.main_infrastructure.latitude,
                    longitude: project.main_infrastructure.longitude,
                    altitude: project.main_infrastructure.altitude,
                    name: project.name,
                    location: project.location,
                }}
            />
        </SectionCard>
    );
};

export default ProjectInfrastructureSection;
