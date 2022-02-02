import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

// CMABIAR NOMBRE SUBPAGELAYOUT
const SubPageLayout = ({...props}) => {
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: theme =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
            }}
        >
            {
                // Fixed header needs a fixed space between top margin and the top of the child component
                // MUI examples add a empty toolbar to solve this problem
                // TODO: Check if there is a good solution for this
                <Toolbar />
            }
            {props.children}
        </Box>
    );
};

export default SubPageLayout;
