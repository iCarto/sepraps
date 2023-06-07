import {SUBPAGE_MENU_DRAWER_WIDTH} from "../app/config/measurements";

import {SubPageMenuHeading} from ".";

import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import MenuList from "@mui/material/MenuList";
import Divider from "@mui/material/Divider";

const SubPageMenu = ({
    headingPrimaryText = "",
    headingSecondaryText = "",
    headingTag = null,
    headingInfo = null,
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
            <Divider />
            <MenuList sx={{color: "white"}} dense disablePadding>
                {subPageMenuDropdown ? (
                    subPageMenuDropdown || (
                        <SubPageMenuHeading
                            headingPrimaryText={headingPrimaryText || "-"}
                            headingSecondaryText={headingSecondaryText}
                            headingTag={headingTag}
                            isSubMenu={true}
                        >
                            {headingInfo}
                        </SubPageMenuHeading>
                    )
                ) : (
                    <Divider
                        sx={{
                            borderRightColor: "white",
                            borderTop:
                                "5px solid " + theme.palette.menu.primary.header.text,
                        }}
                    />
                )}

                {children}
            </MenuList>
        </Box>
    );
};

export default SubPageMenu;
