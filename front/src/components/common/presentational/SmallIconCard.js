import {useNavigate} from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const SmallIconCard = ({
    heading = "",
    figureContent = "",
    icon = null,
    urlPath = "",
}) => {
    const navigate = useNavigate();

    return (
        <Card sx={{width: "100%"}} variant="outlined">
            <CardContent
                sx={{display: "flex", alignItems: "center", justifyContent: "center"}}
            >
                <Grid item container xs={6} justifyContent="center">
                    <IconButton
                        color="primary"
                        onClick={() => {
                            navigate(urlPath);
                        }}
                    >
                        {icon}
                    </IconButton>
                </Grid>
                <Grid
                    container
                    item
                    xs={6}
                    direction="column"
                    alignItems="center"
                    color="grey.800"
                >
                    <Typography variant="overline" lineHeight={1}>
                        {heading}
                    </Typography>
                    <Typography
                        variant="h3"
                        component="span"
                        fontWeight="900"
                        lineHeight={1}
                    >
                        {figureContent}
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SmallIconCard;
