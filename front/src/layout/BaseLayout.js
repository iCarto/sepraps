import {Outlet} from "react-router-dom";
import Box from "@mui/material/Box";
import Header from "./Header";

export default function BaseLayout() {
    return (
        <Box sx={{display: "flex"}}>
            <Header />
            <Outlet />
        </Box>
    );
}
