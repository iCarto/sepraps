import Grid from "@mui/material/Grid";

const ContainerGridWithBorder = ({children, ...props}) => {
    return (
        <Grid
            container
            alignItems="center"
            sx={{
                border: 1,
                borderColor: "lightgrey",
                borderRadius: 5,
                p: 2,
                pr: 3,
                ...props,
            }}
        >
            {children}
        </Grid>
    );
};

export default ContainerGridWithBorder;
