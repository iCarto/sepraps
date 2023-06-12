import {SubPageMenuHeaderButton} from "base/ui/menu";
import useTheme from "@mui/material/styles/useTheme";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const SubPageMenuHeader = ({
    to = "",
    headerText = "",
    headerTitle = "",
    headerTag = null,
    isSubMenu = false,
    children,
}) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={8}
            square
            sx={{
                borderRightColor: "white",
                borderTop: "5px solid " + theme.palette.menu.primary.header.text,
                mb: 1,
            }}
        >
            <SubPageMenuHeaderButton
                headerText={headerText}
                headerTitle={headerTitle}
                headerTag={headerTag}
                isSubMenu={isSubMenu}
                to={to}
            />
            <Box sx={{bgcolor: theme.palette.menu.secondary.header.background}}>
                {children}
            </Box>
        </Paper>
    );
};

export default SubPageMenuHeader;
