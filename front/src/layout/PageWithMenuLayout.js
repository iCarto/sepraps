import Grid from "@mui/material/Grid";

const PageWithMenuLayout = ({menu, children}) => {
    return (
        <Grid container>
            <Grid
                item
                sx={{
                    position: "fixed",
                    zIndex: 1,
                    width: "210px",
                    height: "100vh",
                    backgroundColor: "white",
                    borderRight: 1,
                    borderColor: theme => theme.palette.grey[300],
                }}
            >
                {menu}
            </Grid>
            <Grid item xs style={{marginLeft: "210px"}}>
                {children}
            </Grid>
        </Grid>
    );
};

export default PageWithMenuLayout;
