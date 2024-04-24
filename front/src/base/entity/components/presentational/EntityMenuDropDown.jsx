import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {theme} from "Theme";
import {useList} from "base/entity/hooks";
import {DropdownMenuItemLink, SubPageMenuHeaderItem} from "base/ui/menu";

import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const EntityMenuDropDown = ({
    service,
    template = "",
    title = "",
    primary = "",
    secondary = "",
    tag = null,
    renderDropdownItem = null,
    basePath,
}) => {
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [anchorElement, setAnchorElement] = useState(null);

    const {filter} = useList();
    const location = useLocation();

    const isOpen = Boolean(anchorElement);

    useEffect(() => {
        setLoading(true);
        service(filter, false, false, template).then(data => {
            setElements(data);
            setLoading(false);
        });
    }, [filter]);

    const getUrl = itemId => {
        const urlSlugs = location.pathname.replace(basePath + "/", "").split("/");

        if (urlSlugs[1] === "questionnaires") {
            return `${basePath}/${itemId}/${urlSlugs[1]}/${urlSlugs[2]}`;
        }
        if (
            [
                "payment",
                "buildingcomponents",
                "certifications",
                "socialcomponents",
                "trainings",
                "connections",
            ].includes(urlSlugs[1])
        ) {
            return `${basePath}/${itemId}/${urlSlugs[1]}/overview`;
        }
        return `${basePath}/${itemId}/${urlSlugs[1]}`;
    };

    const handleClick = event => {
        setAnchorElement(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElement(null);
    };

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    mb: 1,
                }}
            >
                <SubPageMenuHeaderItem
                    primary={primary}
                    secondary={secondary}
                    title={title}
                    tag={tag}
                    action={
                        elements?.length > 0 && (
                            <IconButton
                                size="small"
                                sx={{
                                    p: 0,
                                    bgcolor: theme.palette.secondary.lighter,
                                    color: "grey.600",
                                }}
                                onClick={handleClick}
                            >
                                <ArrowDropDownIcon />
                            </IconButton>
                        )
                    }
                />
            </Paper>
            <Divider />

            {elements.length ? (
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
                                to={getUrl(item.id)}
                                onClick={handleClose}
                            >
                                {renderDropdownItem(item)}
                            </DropdownMenuItemLink>
                        );
                    })}
                </Menu>
            ) : null}
        </>
    );
};

export default EntityMenuDropDown;
