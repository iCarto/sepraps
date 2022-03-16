import {Link, useMatch, useResolvedPath} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

const DropdownMenuItemLink = ({children, to, ...props}) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({path: resolved.pathname, end: true});

    return (
        <MenuItem
            button
            component={Link}
            to={to}
            sx={{bgcolor: match ? "grey.100" : "inherit"}}
            {...props}
        >
            {children}
        </MenuItem>
    );
};

export default DropdownMenuItemLink;
