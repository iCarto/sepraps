import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import {MenuListItemButton} from ".";

const MenuListDetailButton = ({isGroupItem = true}) => {
    return (
        <MenuListItemButton
            to="detail"
            text="Detalle"
            icon={<InventoryRoundedIcon />}
            isGroupItem={isGroupItem}
        />
    );
};

export default MenuListDetailButton;
