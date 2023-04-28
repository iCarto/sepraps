import {SubPageMenuListGroupItemButton} from ".";
import useTheme from "@mui/material/styles/useTheme";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

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

const SubPageMenuListGroup = ({headerText = "", headerIcon = null, items = []}) => {
    const theme = useTheme();

    const submenuItems = items.map((menuListSubItem, index) => (
        <SubPageMenuListGroupItemButton
            text={menuListSubItem.text}
            to={menuListSubItem.to}
        />
    ));

    return (
        <>
            {headerText ? (
                <>
                    <ListItem
                        sx={{
                            bgcolor: theme.palette.menu.secondary.options.background,
                        }}
                    >
                        <ListItemIcon
                            style={{
                                minWidth: "35px",
                                color: theme.palette.menu.secondary.options.text,
                            }}
                        >
                            {headerIcon}
                        </ListItemIcon>
                        <ListItemText
                            sx={{color: theme.palette.menu.secondary.options.text}}
                        >
                            {headerText}
                        </ListItemText>
                        <KeyboardArrowDownIcon
                            sx={{color: theme.palette.menu.secondary.options.text}}
                        />
                    </ListItem>
                    <Divider sx={{borderColor: "#ededed"}} />
                </>
            ) : null}

            <Box sx={{bgcolor: theme.palette.menu.secondary.options.background}}>
                {items.length ? (
                    <List dense disablePadding>
                        {submenuItems}
                    </List>
                ) : null}
            </Box>
        </>
    );
};

export default SubPageMenuListGroup;
