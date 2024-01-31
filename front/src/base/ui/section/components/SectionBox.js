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
                p: 1,
            }}
        >
            <Grid item xs>
                {label ? (
                    <>
                        <Typography
                            sx={{
                                color: "grey.500",
                                fontSize: "0.8rem",
                                textTransform: "uppercase",
                            }}
                        >
                            {label}
                        </Typography>
                        <Divider sx={{mb: 1}} />{" "}
                    </>
                ) : null}
                <Box sx={{px: 1}}>{children}</Box>
            </Grid>
        </Grid>
    );
};

export default SectionBox;
