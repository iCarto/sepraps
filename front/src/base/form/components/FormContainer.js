import Grid from "@mui/material/Grid";

const FormContainer = ({children}) => {
    return (
        <Grid
            container
            flexDirection="column"
            p={1}
            border={1}
            borderColor={"grey.300"}
            borderRadius={1}
            sx={{backgroundColor: "grey.50"}}
        >
            {children}
        </Grid>
    );
};

export default FormContainer;
