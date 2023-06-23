import {SUBPAGE_MENU_DRAWER_WIDTH} from "../app/config/measurements";

import {SubPageMenuHeader} from ".";

import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import MenuList from "@mui/material/MenuList";

const SubPageMenu = ({
    headerTitle = "",
    headerText = "",
    headerTag = null,
    headerContent = null,
    subPageMenuDropdown = null,
    children,
}) => {
    const theme = useTheme();

    const menuStyles = {
        position: "fixed",
        zIndex: 1,
        width: `${SUBPAGE_MENU_DRAWER_WIDTH}px`,
        height: "100%",
        bgcolor: theme.palette.menu.secondary.background,
    };

    return (
        <Box component="nav" sx={menuStyles}>
            <MenuList sx={{color: "white"}} dense disablePadding>
                {subPageMenuDropdown || (
                    <SubPageMenuHeader
                        headerText={headerText || "-"}
                        headerTitle={headerTitle}
                        headerTag={headerTag}
                        isSubMenu={true}
                    >
                        {headerContent}
                    </SubPageMenuHeader>
                )}

                {children}
            </MenuList>
        </Box>
    );
};

export default SubPageMenu;
