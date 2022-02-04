import Box from "@mui/material/Box";

const PageLayout = ({children}) => {
    return (
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
            {children}
        </Box>
    );
};

export default PageLayout;
