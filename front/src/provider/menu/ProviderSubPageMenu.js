import {SubPageMenu, SubPageMenuListItemButton} from "base/ui/menu";
import {SelectProviderDropDown} from "provider/container";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";

const ProviderSubPageMenu = ({provider}) => {
    const basePath = `/providers/list/${provider?.id}`;

    return (
        <SubPageMenu
            subPageMenuDropdown={<SelectProviderDropDown provider={provider} />}
        >
            <SubPageMenuListItemButton
                key="provider-detail"
                to={`${basePath}/summary`}
                text="Resumen"
                icon={<InventoryRoundedIcon />}
            />
            <SubPageMenuListItemButton
                key="provider-contacts"
                to={`${basePath}/contacts`}
                text="Plantel"
                icon={<PermContactCalendarOutlinedIcon />}
            />
        </SubPageMenu>
    );
};

export default ProviderSubPageMenu;
