import {MenuListItemButton} from ".";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const MenuListLocationButton = ({isGroupItem = true}) => {
    return (
        <MenuListItemButton
            to="location"
            text="Ubicación"
            icon={<LocationOnOutlinedIcon />}
            isGroupItem={isGroupItem}
        />
    );
};

export default MenuListLocationButton;
