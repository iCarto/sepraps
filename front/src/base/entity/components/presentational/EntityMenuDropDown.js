import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {useList} from "base/entity/hooks";
import {DropdownMenuItemLink, SubPageMenuHeaderButton} from "base/ui/menu";

import useTheme from "@mui/material/styles/useTheme";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const EntityMenuDropDown = ({
    service,
    template = "",
    entityInfo = {
        id: "",
        title: "",
        slug: "",
        primaryInfo: "",
        secondaryInfo: "",
        tag: null,
    },
    getDropdownItemContent = null,
}) => {
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [anchorElement, setAnchorElement] = useState(null);

    const {filter} = useList();
    const location = useLocation();
    const theme = useTheme();

    const isOpen = Boolean(anchorElement);

    useEffect(() => {
        setLoading(true);
        service(filter, false, false, template).then(data => {
            setElements(data);
            setLoading(false);
        });
    }, [filter]);

    const getUrl = itemId => {
        const urlSlugs = location.pathname
            .substring(location.pathname.indexOf(entityInfo?.id) + 1)
            .split("/");

        if (urlSlugs[1] !== "questionnaires") {
            return `/${entityInfo?.slug}/${itemId}/${urlSlugs[1]}`;
        }
        return `/${entityInfo?.slug}/${itemId}/${urlSlugs[1]}/${urlSlugs[2]}`;
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
                {entityInfo?.primaryInfo}
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
                {entityInfo?.secondaryInfo}
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
                {entityInfo ? (
                    <SubPageMenuHeaderButton
                        headerText={entityBasicInfo}
                        headerTitle={entityInfo?.title}
                        headerTag={entityInfo?.tag}
                        isDropDown={true}
                        onClick={handleClick}
                        isPopUpOpen={isOpen}
                    />
                ) : (
                    <Stack
                        sx={{p: 0.5, justifyContent: "center", alignItems: "center"}}
                    >
                        <CircularProgress size={30} />
                    </Stack>
                )}
            </Paper>

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
                                selected={item.id === entityInfo?.id}
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
