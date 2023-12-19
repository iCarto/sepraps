import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

const SectionBox = ({label, children}) => {
    return (
        <Grid
            container
            sx={{
                border: 1,
                borderRadius: 2,
                borderColor: "grey.200",
                p: 1,
            }}
        >
            <Grid item xs>
                <Typography sx={{color: "grey.500", fontSize: "0.8rem"}}>
                    {label}
                </Typography>
                <Divider sx={{mb: 1}} />
                {children}
            </Grid>
        </Grid>
    );
};

export default SectionBox;
