import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {useList} from "base/entity/hooks";
import {DropdownMenuItemLink, SubPageMenuHeaderItem} from "base/ui/menu";

import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";

const EntityMenuDropDown = ({
    service,
    template = "",
    title = "",
    primary = "",
    secondary = "",
    body = null,
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
                "socialcomponents",
                "project_analysis",
                "project_social_analysis",
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
                square
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
                            <Button
                                size="small"
                                endIcon={<ArrowDropDownIcon />}
                                sx={{textTransform: "lowercase", color: "grey.400"}}
                                onClick={handleClick}
                            >
                                cambiar
                            </Button>
                        )
                    }
                />
            </Paper>
            <Divider />

            {elements.length && (
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
            )}
        </>
    );
};

export default EntityMenuDropDown;
