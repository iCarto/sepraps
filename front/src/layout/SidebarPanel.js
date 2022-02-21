import {styled} from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {useEffect} from "react";
import {useOutletContext} from "react-router-dom";

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const SidebarPanel = ({children}) => {
    // setOpen function is allways the last element in the context array
    let setOpen;
    const outletContext = useOutletContext();
    if (outletContext) {
        setOpen = outletContext[outletContext.length - 1];
    }

    useEffect(() => {
        setOpen(true);

        // returned function will be called on component unmount
        return () => {
            setOpen(false);
        };
    });

    return <Box sx={{p: 3}}>{children}</Box>;
};

export {SidebarPanel as default, DrawerHeader};
