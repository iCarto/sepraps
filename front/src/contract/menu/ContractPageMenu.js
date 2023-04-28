import {useLocation} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {PageMenu, PageMenuListItemButton} from "base/ui/menu";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ChecklistIcon from "@mui/icons-material/Checklist";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const ContractPageMenu = () => {
    const {ROLES} = useAuth();
    const location = useLocation();
    const currentUrl = location.pathname;
    const entityUrlSlug = "contracts";
    const basePath = currentUrl.split(`/${entityUrlSlug}/`)[0];

    return (
        <PageMenu>
            <PageMenuListItemButton
                key="contracts-list"
                to={`${basePath}/${entityUrlSlug}/list`}
                text="Listado"
                icon={<MapOutlinedIcon />}
            />
            <PageMenuListItemButton
                key="contracts-supervision"
                to={`${basePath}/${entityUrlSlug}/supervision`}
                text="Supervisión"
                icon={<ChecklistIcon />}
            />
            <PageMenuListItemButton
                key="contracts-stats"
                to={`${basePath}/${entityUrlSlug}/stats`}
                text="Estadísticas"
                icon={<QueryStatsIcon />}
            />
        </PageMenu>
    );
};

export default ContractPageMenu;
