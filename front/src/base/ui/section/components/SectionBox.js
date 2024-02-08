import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const SectionBox = ({label = "", children}) => {
    return (
        <Grid
            container
            sx={{
                border: 0,
                borderRadius: 2,
                borderColor: "grey.200",
            }}
        >
            <Grid item xs>
                {label ? (
                    <Typography
                        sx={{
                            color: "grey.500",
                            fontSize: "0.8rem",
                            textTransform: "uppercase",
                        }}
                    >
                        {label}
                    </Typography>
                ) : null}
                <Divider /> <Box sx={{p: 1}}>{children}</Box>
            </Grid>
        </Grid>
    );
};

export default SectionBox;
