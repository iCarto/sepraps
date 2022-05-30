import ListItem from "@mui/material/ListItem";
import {Link, useLocation, useResolvedPath} from "react-router-dom";

const MenuListItemLink = ({children, to, ...props}) => {
    let resolved = useResolvedPath(to);
    let location = useLocation();

    const selectedOptionStyle = {
        bgcolor: "white",
        borderLeft: "3px solid #5E6164",
    };

    const selected = location.pathname.startsWith(resolved.pathname);

    return (
        <ListItem
            button
            component={Link}
            to={to}
            {...props}
            sx={selected ? selectedOptionStyle : {bgcolor: "grey.200"}}
        >
            {children}
        </ListItem>
    );
};

export default MenuListItemLink;
