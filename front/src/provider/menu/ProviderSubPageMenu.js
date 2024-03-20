import {SubPageMenu, SubPageMenuListItemButton} from "base/ui/menu";
import {SelectProviderDropDown} from "provider/container";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";

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
            <SubPageMenuListItemButton
                key="provider-projects"
                to={`${basePath}/projects`}
                text="Proyectos"
                icon={<BallotOutlinedIcon />}
            />
        </SubPageMenu>
    );
};

export default ProviderSubPageMenu;
