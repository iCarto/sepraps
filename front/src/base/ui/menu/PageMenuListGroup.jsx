import {useEffect, useState} from "react";
import {usePageMenu} from "./provider";

import {SubPageMenuListGroupItemButton} from ".";

import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

const PageMenuListGroup = ({
    id = "",
    headerTitle = "",
    headerIcon = null,
    items = [],
}) => {
    const theme = useTheme();
    const {expandedGroup, setExpandedGroup} = usePageMenu();
    const [showChildren, setShowChildren] = useState(false);

    const menuItems = items.map((menuListSubItem, index) => (
        <SubPageMenuListGroupItemButton
            parentId={id}
            key={index}
            text={menuListSubItem.text}
            to={menuListSubItem.to}
            urlSlug={menuListSubItem.urlSlug}
        />
    ));

    const onClickHeader = () => {
        setExpandedGroup(id);
    };

    useEffect(() => {
        setShowChildren(expandedGroup === id);
    }, [expandedGroup, id]);

    return (
        <>
            {headerTitle ? (
                <ListItem
                    sx={{bgcolor: theme.palette.menu.primary.header.background}}
                    onClick={onClickHeader}
                >
                    {headerIcon && (
                        <ListItemIcon
                            style={{
                                minWidth: "35px",
                                color:
                                    expandedGroup === id
                                        ? theme.palette.menu.primary.header.text
                                        : theme.palette.menu.primary.header.icon,
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

            <Box
                sx={{
                    bgcolor: theme.palette.menu.primary.options.background,
                    transition: "all 0.5s ease-in-out",
                    display: showChildren ? "inherit" : "none",
                    overflow: "hidden",
                }}
            >
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
