import Grid from "@mui/material/Grid";

const FormContainer = ({children}) => {
    return (
        <Grid
            container
            flexDirection="column"
            p={1}
            border={1}
            borderColor={"primary.main"}
            borderRadius={1}
            sx={{backgroundColor: "#f7fdff"}}
        >
            {children}
        </Grid>
    );
};

export default FormContainer;
