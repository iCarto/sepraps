import {useLocation} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {PageMenu, PageMenuListItemButton} from "base/ui/menu";

import ListIcon from "@mui/icons-material/List";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const FieldReportPageMenu = () => {
    const {ROLES} = useAuth();
    const location = useLocation();
    const currentUrl = location.pathname;
    const entityUrlSlug = "field-reports";
    const basePath = currentUrl.split(`/${entityUrlSlug}/`)[0];

    return (
        <PageMenu collapsed={true}>
            <PageMenuListItemButton
                key="field-reports-list"
                to={`${basePath}/${entityUrlSlug}`}
                text="Listado"
                icon={<ListIcon />}
            />
        </PageMenu>
    );
};

export default FieldReportPageMenu;
