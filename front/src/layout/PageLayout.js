import {useTheme} from "@emotion/react";
import Box from "@mui/material/Box";

const PageLayout = ({children}) => {
    const theme = useTheme();

    return (
        <Box sx={{flexGrow: 1, p: 3, backgroundColor: theme.palette.pageBackground}}>
            {children}
        </Box>
    );
};

export default PageLayout;
