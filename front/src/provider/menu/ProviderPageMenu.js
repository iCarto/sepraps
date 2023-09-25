import {useLocation} from "react-router-dom";

import {PageMenu, PageMenuListItemButton} from "base/ui/menu";

import ListIcon from "@mui/icons-material/List";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const ProviderPageMenu = () => {
    const location = useLocation();
    const currentUrl = location.pathname;
    const entityUrlSlug = "providers";
    const basePath = currentUrl.split(`/${entityUrlSlug}/`)[0];

    return (
        <PageMenu collapsed={true}>
            <PageMenuListItemButton
                key="providers-list"
                to={`${basePath}/${entityUrlSlug}/list`}
                text="Listado"
                icon={<ListIcon />}
            />
            <PageMenuListItemButton
                key="providers-stats"
                to={`${basePath}/${entityUrlSlug}/stats`}
                text="Estadísticas"
                icon={<QueryStatsIcon />}
            />
        </PageMenu>
    );
};

export default ProviderPageMenu;
