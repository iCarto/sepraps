import {SubPageMenuHeaderItem} from "base/ui/menu";
import useTheme from "@mui/material/styles/useTheme";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const SubPageMenuHeader = ({
    headerText = "",
    headerSecondary = "",
    headerTitle = "",
    headerTag = null,
    children,
}) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={0}
            square
            sx={{
                my: 1,
            }}
        >
            <SubPageMenuHeaderItem
                primary={headerText}
                secondary={headerSecondary}
                title={headerTitle}
                tag={headerTag}
            />
            <Box sx={{bgcolor: theme.palette.menu.secondary.header.background}}>
                {children}
            </Box>
        </Paper>
    );
};

export default SubPageMenuHeader;
