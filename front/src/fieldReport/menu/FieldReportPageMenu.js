import {useLocation} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {PageMenu, PageMenuListItemButton} from "base/ui/menu";

import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const FieldReportPageMenu = () => {
    const {ROLES} = useAuth();
    const location = useLocation();
    const currentUrl = location.pathname;
    const entityUrlSlug = "field-reports";
    const basePath = currentUrl.split(`/${entityUrlSlug}/`)[0];

    return (
        <PageMenu>
            <PageMenuListItemButton
                key="field-reports-list"
                to={`${basePath}/${entityUrlSlug}/list`}
                text="Listado"
                icon={<MapOutlinedIcon />}
            />

            <PageMenuListItemButton
                key="field-reports-stats"
                to={`${basePath}/${entityUrlSlug}/stats`}
                text="Estadísticas"
                icon={<QueryStatsIcon />}
            />
        </PageMenu>
    );
};

export default FieldReportPageMenu;
