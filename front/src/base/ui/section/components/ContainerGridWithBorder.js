import Grid from "@mui/material/Grid";

const ContainerGridWithBorder = ({children}) => {
    return (
        <Grid
            container
            alignItems="center"
            sx={{
                border: 1,
                borderColor: "lightgrey",
                borderRadius: 5,
                p: 2,
            }}
        >
            {children}
        </Grid>
    );
};

export default ContainerGridWithBorder;
