import {useParams} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {SubPageMenu, PageMenuListItemButton} from "base/ui/menu";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const ProjectSubPageMenu = ({project}) => {
    const {ROLES} = useAuth();
    const {id} = useParams();
    const basePath = `/projects/${id}`;

    return (
        <SubPageMenu
            headingPrimaryText={project?.name}
            headingSecondaryText={`Proyecto:`}
        >
            <PageMenuListItemButton
                key="project-detail"
                to={`${basePath}/summary`}
                text="Resumen"
                icon={<InventoryRoundedIcon />}
            />
            <PageMenuListItemButton
                key="project-contacts"
                to={`${basePath}/contacts`}
                text="Contactos"
                icon={<PermContactCalendarIcon />}
            />
        </SubPageMenu>
    );
};

export default ProjectSubPageMenu;
