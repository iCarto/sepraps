import {BaseLayerSelector, useDownloadMapAsPng} from "base/geo";
import useTheme from "@mui/material/styles/useTheme";

import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MapDownloadPngAction from "./MapDownloadPngAction";

const MapActions = ({mapObjectRef, mapRef, showMapActions = false}) => {
    const theme = useTheme();

    const {
        setConfig: setConfigMapAsPng,
        download: handleDownloadMapAsPng,
        generate: generateMapAsPng,
        getDimensions: getMapAsPngDimensions,
    } = useDownloadMapAsPng();

    setConfigMapAsPng(mapObjectRef.current, mapRef.current);

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                bgcolor: theme.palette.secondary.light,
                borderBottom: `1px solid ${theme.palette.secondary.main}`,
                height: "50px",
            }}
        >
            <Typography sx={{pl: 3, pt: 1, pb: 1}} variant="h6">
                Capas
            </Typography>
            {showMapActions && (
                <ButtonGroup variant="outlined" aria-label="map button group">
                    <Divider orientation="vertical" flexItem />
                    <BaseLayerSelector />
                    <Divider orientation="vertical" flexItem />
                    <MapDownloadPngAction onDownloadMapAsPng={handleDownloadMapAsPng} />
                </ButtonGroup>
            )}
        </Grid>
    );
};

export default MapActions;
