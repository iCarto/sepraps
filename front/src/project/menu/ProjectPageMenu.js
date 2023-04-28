import {useLocation} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {PageMenu, PageMenuListItemButton} from "base/ui/menu";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ChecklistIcon from "@mui/icons-material/Checklist";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const ProjectPageMenu = () => {
    const {ROLES} = useAuth();
    const location = useLocation();
    const currentUrl = location.pathname;
    const entityUrlSlug = "projects";
    const basePath = currentUrl.split(`/${entityUrlSlug}/`)[0];

    return (
        <PageMenu>
            <PageMenuListItemButton
                key="projects-list"
                to={`${basePath}/${entityUrlSlug}/list`}
                text="Listado"
                icon={<MapOutlinedIcon />}
            />
            <PageMenuListItemButton
                key="projects-supervision"
                to={`${basePath}/${entityUrlSlug}/supervision`}
                text="Supervisión"
                icon={<ChecklistIcon />}
            />
            <PageMenuListItemButton
                key="projects-stats"
                to={`${basePath}/${entityUrlSlug}/stats`}
                text="Estadísticas"
                icon={<QueryStatsIcon />}
            />
        </PageMenu>
    );
};

export default ProjectPageMenu;
