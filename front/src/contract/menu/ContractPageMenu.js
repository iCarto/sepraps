import {useLocation} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {PageMenu, PageMenuListItemButton} from "base/ui/menu";

import ListIcon from "@mui/icons-material/List";

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
                icon={<ListIcon />}
            />
        </PageMenu>
    );
};

export default ContractPageMenu;
