import {useAuth} from "base/user/provider";
import {SubPageMenu, PageMenuListItemButton} from "base/ui/menu";
import {SelectProviderDropDown} from "provider/menu";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const ProviderSubPageMenu = ({provider}) => {
    const {ROLES} = useAuth();
    const basePath = `/providers/${provider?.id}`;

    return (
        <SubPageMenu
            subPageMenuDropdown={<SelectProviderDropDown provider={provider} />}
        >
            <PageMenuListItemButton
                key="provider-detail"
                to={`${basePath}/summary`}
                text="Resumen"
                icon={<InventoryRoundedIcon />}
            />
            <PageMenuListItemButton
                key="provider-contacts"
                to={`${basePath}/contacts`}
                text="Contactos"
                icon={<PermContactCalendarIcon />}
            />
        </SubPageMenu>
    );
};

export default ProviderSubPageMenu;
