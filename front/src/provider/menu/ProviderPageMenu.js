import {useLocation} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {PageMenu, PageMenuListItemButton} from "base/ui/menu";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const ProviderPageMenu = () => {
    const {ROLES} = useAuth();
    const location = useLocation();
    const currentUrl = location.pathname;
    const entityUrlSlug = "providers";
    const basePath = currentUrl.split(`/${entityUrlSlug}/`)[0];

    return (
        <PageMenu>
            <PageMenuListItemButton
                key="providers-list"
                to={`${basePath}/${entityUrlSlug}/list`}
                text="Listado"
                icon={<MapOutlinedIcon />}
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
