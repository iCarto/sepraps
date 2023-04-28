import {useParams} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {SubPageMenu, PageMenuListItemButton} from "base/ui/menu";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const ProviderSubPageMenu = ({provider}) => {
    const {ROLES} = useAuth();
    const {id} = useParams();
    const basePath = `/providers/${id}`;

    return (
        <SubPageMenu
            headingPrimaryText={provider.name}
            headingSecondaryText={`Prestador:`}
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
