import ListItem from "@mui/material/ListItem";
import {Link, useMatch, useResolvedPath} from "react-router-dom";

const MenuListItemLink = ({children, to, ...props}) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({path: resolved.pathname, end: true});

    return (
        <ListItem
            button
            component={Link}
            to={to}
            sx={{bgcolor: match ? "grey.100" : "inherit"}}
            {...props}
        >
            {children}
        </ListItem>
    );
};

export default MenuListItemLink;
