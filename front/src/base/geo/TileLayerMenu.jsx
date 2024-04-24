import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircleIcon from "@mui/icons-material/Circle";

const TileLayerMenu = ({layerProvider}) => {
    const {
        included,
        visible,
        showLayer,
        layer: {legend},
    } = layerProvider;

    return (
        included && (
            <>
                <ListItem disablePadding sx={{pl: 2}} className="LayerMenuListItem">
                    <Grid container direction="row" alignItems="center">
                        <Grid item>
                            <Checkbox
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                inputProps={{"aria-labelledby": "bombeos"}}
                                checked={visible}
                                onChange={event => {
                                    showLayer(event.target.checked);
                                }}
                                className="LayerMenuCheckbox"
                            />
                        </Grid>
                        <Grid item>
                            <div className="LayerMenuIcon" style={{fontSize: "7pt"}}>
                                {legend.layerType}
                            </div>
                        </Grid>
                        <Grid item>{legend.layerName}</Grid>
                    </Grid>
                </ListItem>
                {visible && legend.legendItems && (
                    <List dense={true} className="LayerMenuDiscriminatorInfo">
                        {legend.legendItems.map(legendItem => (
                            <ListItem
                                disablePadding
                                className="LayerMenuLegendItem"
                                key={legendItem.label}
                            >
                                <ListItemIcon
                                    style={{
                                        minWidth: "20px",
                                        color: legendItem.color,
                                    }}
                                >
                                    <CircleIcon sx={{fontSize: "0.5rem"}} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={legendItem.label}
                                    className="LayerMenuLegendItemText"
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </>
        )
    );
};

export default TileLayerMenu;
