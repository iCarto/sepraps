import Grid from "@mui/material/Grid";

const PageWithMenuLayout = ({menu, children}) => {
    return (
        <Grid container>
            <Grid item style={{width: "210px", position: "fixed"}}>
                {menu}
            </Grid>
            <Grid item xs style={{marginLeft: "210px"}}>
                {children}
            </Grid>
        </Grid>
    );
};

export default PageWithMenuLayout;
