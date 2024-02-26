import {useNavigate} from "react-router-dom";

import {ContainerGridWithBorder} from "base/ui/section/components";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

const SmallIconCard = ({
    heading = "",
    figureContent = null,
    icon = null,
    urlPath = "",
}) => {
    const navigate = useNavigate();

    return (
        <ContainerGridWithBorder>
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
                <Typography
                    variant="h3"
                    component="span"
                    fontWeight="900"
                    lineHeight={1}
                >
                    {figureContent}
                </Typography>
                <Typography variant="overline" lineHeight={1}>
                    {heading}
                </Typography>
            </Grid>
        </ContainerGridWithBorder>
    );
};

export default SmallIconCard;
