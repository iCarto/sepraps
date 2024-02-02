import Grid from "@mui/material/Grid";

const PageWithMenuLayout = ({menu, children}) => {
    const leftMenuWidth = "210px";

    return (
        <Grid container>
            <Grid
                component="nav"
                item
                sx={{
                    position: "fixed",
                    zIndex: 1,
                    width: leftMenuWidth,
                    height: "100vh",
                    backgroundColor: "white",
                    borderRight: 1,
                    borderColor: theme => theme.palette.pageBackground.primary,
                }}
            >
                {menu}
            </Grid>
            <Grid item xs style={{marginLeft: `${leftMenuWidth}`}}>
                {children}
            </Grid>
        </Grid>
    );
};

export default PageWithMenuLayout;
