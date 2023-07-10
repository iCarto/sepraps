import useTheme from "@mui/material/styles/useTheme";
import {SubPageMenuListGroupItemButton, SubmenuAccordion} from ".";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
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

const SubPageMenuListGroup = ({headerTitle = "", headerIcon = null, items = []}) => {
    const theme = useTheme();

    const submenuItems = items.map((menuListSubItem, index) => (
        <SubPageMenuListGroupItemButton
            key={index}
            text={menuListSubItem.text}
            to={menuListSubItem.to}
        />
    ));

    const SubmenuTitle = () => {
        return (
            <ListItem
                sx={{
                    bgcolor: theme.palette.menu.primary.header.background,
                    color: theme.palette.menu.primary.header.text,
                    fontWeight: "inherit",
                }}
            >
                <ListItemIcon
                    style={{
                        minWidth: "35px",
                        color: theme.palette.menu.primary.header.text,
                    }}
                >
                    {headerIcon}
                </ListItemIcon>
                <ListItemText>{headerTitle}</ListItemText>
            </ListItem>
        );
    };

    return (
        <>
            {headerTitle ? (
                <SubmenuAccordion accordionTitle={<SubmenuTitle />}>
                    <Box
                        sx={{
                            bgcolor: theme.palette.menu.secondary.options.background,
                        }}
                    >
                        {items.length ? (
                            <List dense disablePadding>
                                {submenuItems}
                            </List>
                        ) : null}
                    </Box>
                </SubmenuAccordion>
            ) : null}
        </>
    );
};

export default SubPageMenuListGroup;
