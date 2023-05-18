import {useState} from "react";
import {useLocation} from "react-router-dom";

import {useList} from "base/entity/hooks";
import {DropdownMenuItemLink, SubPageMenuHeadingButton} from "base/ui/menu";

import useTheme from "@mui/material/styles/useTheme";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const EntityMenuDropDown = ({
    currentItem,
    entityPrimaryInfo,
    entitySecondaryInfo = "",
    urlPrimarySlug = "",
    headingSecondaryText = "",
    getDropdownItemContent = null,
    headingTag = null,
}) => {
    const [anchorElement, setAnchorElement] = useState(null);

    const {elements} = useList();
    let location = useLocation();

    const isOpen = Boolean(anchorElement);

    const theme = useTheme();

    const getSubPageUrlSlug = () => {
        const urlSlugs = location.pathname
            .substring(location.pathname.indexOf(currentItem?.id) + 1)
            .split("/");

        if (urlSlugs[1] !== "questionnaires") {
            return urlSlugs[1];
        }
        return `${urlSlugs[1]}/${urlSlugs[2]}`;
    };

    const handleClick = event => {
        setAnchorElement(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElement(null);
    };

    const entityBasicInfo = (
        <Stack>
            <Typography
                sx={{
                    pt: 1,
                    fontSize: 20,
                    fontWeight: 800,
                    lineHeight: 1.25,
                }}
            >
                {entityPrimaryInfo}
            </Typography>
            <Typography
                variant="overline"
                sx={{
                    pt: 0.75,
                    lineHeight: 1.25,
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                }}
            >
                {entitySecondaryInfo}
            </Typography>
        </Stack>
    );

    return (
        <>
            <Paper
                elevation={8}
                square
                sx={{
                    borderRightColor: "white",
                    borderTop: "5px solid " + theme.palette.menu.primary.header.text,
                    mb: 1,
                }}
            >
                <SubPageMenuHeadingButton
                    headingPrimaryText={entityBasicInfo}
                    headingSecondaryText={headingSecondaryText}
                    headingTag={headingTag}
                    isDropDown={true}
                    onClick={handleClick}
                    isPopUpOpen={isOpen}
                />
            </Paper>

            {elements.length > 0 && (
                <Menu
                    id="lock-menu"
                    anchorEl={anchorElement}
                    open={isOpen}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "lock-button",
                        role: "listbox",
                    }}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    {elements.map(item => {
                        return (
                            <DropdownMenuItemLink
                                variant="menu"
                                key={item.id}
                                id={item.id}
                                to={`/${urlPrimarySlug}/${
                                    item.id
                                }/${getSubPageUrlSlug()}`}
                                selected={item.id === currentItem?.id}
                                onClick={handleClose}
                            >
                                {getDropdownItemContent(item)}
                            </DropdownMenuItemLink>
                        );
                    })}
                </Menu>
            )}
        </>
    );
};

export default EntityMenuDropDown;
