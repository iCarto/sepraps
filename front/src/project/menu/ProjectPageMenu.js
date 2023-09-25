import {useLocation} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {PageMenu, PageMenuListItemButton} from "base/ui/menu";

import ListIcon from "@mui/icons-material/List";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const ProjectPageMenu = () => {
    const {ROLES} = useAuth();
    const location = useLocation();
    const currentUrl = location.pathname;
    const entityUrlSlug = "projects";
    const basePath = currentUrl.split(`/${entityUrlSlug}/`)[0];

    return (
        <PageMenu collapsed={true}>
            <PageMenuListItemButton
                key="projects-list"
                to={`${basePath}/${entityUrlSlug}/list`}
                text="Listado"
                icon={<ListIcon />}
            />
            <PageMenuListItemButton
                key="project-stats"
                to={`${basePath}/${entityUrlSlug}/stats`}
                text="Estadísticas"
                icon={<QueryStatsIcon />}
            />
        </PageMenu>
    );
};

export default ProjectPageMenu;
