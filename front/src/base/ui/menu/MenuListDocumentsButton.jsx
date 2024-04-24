import {MenuListItemButton} from ".";

import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";

const MenuListDocumentsButton = ({isGroupItem = true}) => {
    return (
        <MenuListItemButton
            to="documents"
            text="Documentos"
            icon={<TopicOutlinedIcon />}
            isGroupItem={isGroupItem}
        />
    );
};

export default MenuListDocumentsButton;
