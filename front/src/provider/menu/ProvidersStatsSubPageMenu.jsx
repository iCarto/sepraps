import {SubPageMenu, SubPageMenuListItemButton} from "base/ui/menu";

import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";

const ProvidersStatsSubPageMenu = () => {
    const basePath = `/providers/stats`;

    return (
        <SubPageMenu headerTitle="Estadísticas" headerText="Prestadores de servicio">
            <SubPageMenuListItemButton
                key="provider-detail"
                to={`${basePath}/gender`}
                text="Género"
                icon={<PermContactCalendarOutlinedIcon />}
            />
            <SubPageMenuListItemButton
                key="provider-contacts"
                to={`${basePath}/contacts`}
                text="Miembros de las Comisiones Directivas"
                icon={<RecentActorsOutlinedIcon />}
            />
        </SubPageMenu>
    );
};

export default ProvidersStatsSubPageMenu;
