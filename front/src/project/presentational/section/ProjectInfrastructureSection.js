import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import {useAuth} from "base/user/provider";

import {SectionCard, SectionCardHeaderAction} from "base/section/components";
import {MapInfrastructure} from "base/map/components";
import EditIcon from "@mui/icons-material/Edit";

const ProjectInfrastructureSection = ({project}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();
    const location = useLocation();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("main_infrastructure/edit");
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    const isEditLocationOpen =
        location.pathname.indexOf("main_infrastructure/edit") >= 0;
    const isProjectClosed = project.closed;

    return (
        <SectionCard
            title="Infraestructura principal"
            secondaryActions={!isProjectClosed && secondaryActions}
        >
            {!isEditLocationOpen ? (
                <MapInfrastructure
                    infrastructure={{
                        latitude: project.main_infrastructure.latitude,
                        longitude: project.main_infrastructure.longitude,
                        altitude: project.main_infrastructure.altitude,
                        name: project.name,
                        location: project.location,
                    }}
                />
            ) : null}
        </SectionCard>
    );
};

export default ProjectInfrastructureSection;
