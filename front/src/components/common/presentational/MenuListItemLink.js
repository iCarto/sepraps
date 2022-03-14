import ListItem from "@mui/material/ListItem";
import {Link, useLocation, useResolvedPath} from "react-router-dom";

const MenuListItemLink = ({children, to, ...props}) => {
    let resolved = useResolvedPath(to);
    let location = useLocation();

    let locationPathFirstSlug = location.pathname.split("/")[1];
    let resolvedPathFirstSlug = resolved.pathname.split("/")[1];

    let locationSecondLevelPath = location.pathname.split("/").slice(0, 4).toString();
    let resolvedSecondLevelPath = resolved.pathname.split("/").slice(0, 4).toString();

    let firstLevelItemIsSelected;
    let secondLevelItemIsSelected;

    //Pathname contains more than one slash - Is therefore a two-level path (at least)
    if (resolved.pathname.split("/").length - 1 > 1) {
        if (locationSecondLevelPath === resolvedSecondLevelPath) {
            secondLevelItemIsSelected = true;
        }
    } else {
        if (locationPathFirstSlug === resolvedPathFirstSlug) {
            firstLevelItemIsSelected = true;
        }
    }

    const selectedOptionStyle = {
        bgcolor: "white",
        borderLeft: "3px solid #5E6164",
    };

    return (
        <ListItem
            button
            component={Link}
            to={to}
            sx={
                firstLevelItemIsSelected || secondLevelItemIsSelected
                    ? selectedOptionStyle
                    : {bgcolor: "grey.200"}
            }
            {...props}
        >
            {children}
        </ListItem>
    );
};

export default MenuListItemLink;
