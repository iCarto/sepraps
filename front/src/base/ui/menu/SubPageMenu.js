import {HEADER_HEIGHT, SUBPAGE_MENU_DRAWER_WIDTH} from "../app/config/measurements";
import {PageMenuProvider} from "./provider";

import {SubPageMenuHeader} from ".";

import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import MenuList from "@mui/material/MenuList";

const SubPageMenu = ({
    headerTitle = "",
    headerText = "",
    headerSecondary = null,
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
        bgcolor: theme.palette.menu.secondary.background,
        overflowY: "auto",
    };

    return (
        <PageMenuProvider>
            <Box
                component="nav"
                sx={menuStyles}
                style={{
                    height: `calc(100vh - ${HEADER_HEIGHT}px`,
                }}
            >
                <MenuList sx={{color: "white"}} dense disablePadding>
                    {subPageMenuDropdown || (
                        <SubPageMenuHeader
                            headerText={headerText || "-"}
                            headerSecondary={headerSecondary}
                            headerTitle={headerTitle}
                            headerTag={headerTag}
                        >
                            {headerContent}
                        </SubPageMenuHeader>
                    )}
                    {children}
                </MenuList>
            </Box>
        </PageMenuProvider>
    );
};

export default SubPageMenu;
