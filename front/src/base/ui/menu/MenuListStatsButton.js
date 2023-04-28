import {MenuListItemButton} from ".";

import QueryStatsIcon from "@mui/icons-material/QueryStats";

const MenuListStatsButton = ({isGroupItem = true}) => {
    return (
        <MenuListItemButton
            to="stats"
            text="Estadísticas"
            icon={<QueryStatsIcon />}
            isGroupItem={isGroupItem}
        />
    );
};

export default MenuListStatsButton;
