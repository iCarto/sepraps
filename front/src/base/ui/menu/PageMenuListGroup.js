import useTheme from "@mui/material/styles/useTheme";

import {SubPageMenuListGroupItemButton} from ".";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";

/**
 * This component accepts an array of items (`menuListSubItems`). These items can be of 2 types:
 * * React components (e.g. `<MenuListDetailButton />`)
 * * Objects with these attributes:
 *     * to
 *     * text
 *     * icon
 *
 * If `menuListSubItems` is composed of objects, then the `createButtons` prop must be set to `true`, so that the objects can be used to create their corresponding button.
 */

const PageMenuListGroup = ({headerTitle = "", headerIcon = null, items = []}) => {
    const theme = useTheme();

    const menuItems = items.map((menuListSubItem, index) => (
        <SubPageMenuListGroupItemButton
            key={index}
            text={menuListSubItem.text}
            to={menuListSubItem.to}
        />
    ));

    return (
        <>
            {headerTitle ? (
                <ListItem sx={{bgcolor: theme.palette.menu.primary.header.background}}>
                    {headerIcon && (
                        <ListItemIcon
                            style={{
                                minWidth: "35px",
                                color: theme.palette.menu.primary.header.text,
                            }}
                        >
                            {headerIcon}
                        </ListItemIcon>
                    )}
                    <ListItemText sx={{color: theme.palette.menu.primary.header.text}}>
                        {headerTitle}
                    </ListItemText>
                    <KeyboardArrowDownIcon
                        sx={{color: theme.palette.menu.primary.header.text}}
                    />
                </ListItem>
            ) : null}

            <Box sx={{bgcolor: theme.palette.menu.primary.options.background}}>
                {menuItems.length ? (
                    <List dense disablePadding>
                        {menuItems}
                    </List>
                ) : null}
            </Box>
        </>
    );
};

export default PageMenuListGroup;
