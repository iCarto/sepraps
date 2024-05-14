import {useEffect, useState} from "react";
import {usePageMenu} from "./provider";

import {SubPageMenuListGroupItemButton, SubmenuAccordion} from ".";

import useTheme from "@mui/material/styles/useTheme";
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
 *
 * `defaultExpanded` may be set to `true` only when there is just one list group in the menu.
 */

const SubPageMenuListGroup = ({
    id = "",
    headerTitle = "",
    headerIcon = null,
    items = [],
    defaultExpanded = false,
}) => {
    const theme = useTheme();
    const {expandedGroup, setExpandedGroup} = usePageMenu();
    const [showChildren, setShowChildren] = useState(false);

    const submenuItems = items.map((menuListSubItem, index) => {
        return (
            <SubPageMenuListGroupItemButton
                key={index}
                text={menuListSubItem.text}
                to={menuListSubItem.to}
                urlSlug={menuListSubItem.urlSlug}
                parentId={id}
            />
        );
    });

    const onClickHeader = () => {
        setExpandedGroup(id);
        setShowChildren(prevState => !prevState);
    };

    useEffect(() => {
        setShowChildren(expandedGroup === id);

        if (defaultExpanded) setExpandedGroup(id);
    }, [expandedGroup, id, defaultExpanded]);

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
                        color:
                            expandedGroup === id
                                ? theme.palette.menu.primary.header.text
                                : theme.palette.menu.primary.header.icon,
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
                <SubmenuAccordion
                    accordionTitle={<SubmenuTitle />}
                    //expanded={showChildren} Always show expanded until users are familir with it
                    expanded={true}
                    defaultExpanded={defaultExpanded}
                    handleClick={onClickHeader}
                >
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
