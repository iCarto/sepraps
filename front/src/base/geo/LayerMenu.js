import {LayerMenuDiscriminatorInfo} from ".";

import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import ListSubheader from "@mui/material/ListSubheader";
import DownloadIcon from "@mui/icons-material/Download";
import CheckIcon from "@mui/icons-material/Check";
import {MenuAction, MenuActions} from "base/ui/menu";

const LayerMenu = ({layerProvider, customActions = []}) => {
    const {
        included,
        visible,
        showLayer,
        loading,
        discriminator,
        setDiscriminator,
        downloadShapefile,
        layer: {legend},
    } = layerProvider;

    // An empty list of discriminators means a default legend, which only needs to show the default icon
    const hasDiscriminators = legend && Object.keys(legend.discriminators).length > 0;

    const getDiscriminatorLegendItems = attribute => {
        return hasDiscriminators
            ? legend.getDiscriminatorLegend(attribute)?.entries
            : null;
    };

    const getDiscriminatorText = attribute => {
        return hasDiscriminators
            ? legend.getDiscriminatorLegend(attribute)?.text
            : null;
    };

    const getDiscriminatorDefaultIcon = attribute => {
        return legend.getDiscriminatorLegend(attribute)?.getDefaultIcon();
    };

    const legendItems = getDiscriminatorLegendItems(discriminator);

    const getMenuAction = (attribute, discriminator) => {
        return (
            <MenuAction
                id={`view-${attribute}`}
                key={`view-${attribute}`}
                icon={attribute === discriminator ? <CheckIcon /> : null}
                text={getDiscriminatorText(attribute)}
                handleClick={() => setDiscriminator && setDiscriminator(attribute)}
            />
        );
    };

    const handleDownload = () => {
        downloadShapefile();
    };

    const getActionsMenu = () => {
        let downloadAction = (
            <MenuAction
                id="download-layer"
                key="download-layer"
                icon={<DownloadIcon />}
                text="Descargar"
                handleClick={handleDownload}
            />
        );
        return hasDiscriminators ? (
            <MenuActions>
                <ListSubheader component="div" id="nested-list-subheader">
                    Simboloxía por
                </ListSubheader>
                {legend.discriminatorsLegends.map(discriminatorLegend =>
                    getMenuAction(discriminatorLegend.field, discriminator)
                )}
                <Divider />
                {downloadAction}
                {customActions && customActions.length > 0 && <Divider />}
                {customActions && customActions.length > 0 && customActions}
            </MenuActions>
        ) : (
            <MenuActions>{downloadAction}</MenuActions>
        );
    };

    return (
        included && (
            <>
                <ListItem
                    disablePadding
                    sx={{pl: 2}}
                    secondaryAction={getActionsMenu()}
                    className="LayerMenuListItem"
                >
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        wrap="nowrap"
                        sx={{mr: 7}}
                    >
                        <Grid item>
                            {loading ? (
                                <CircularProgress size={20} sx={{ml: 1, mt: 1}} />
                            ) : (
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
                            )}
                        </Grid>
                        <Grid item>
                            <div className="LayerMenuIcon">
                                {getDiscriminatorDefaultIcon(discriminator)}
                            </div>
                        </Grid>
                        <Grid item>{legend.layerName}</Grid>
                    </Grid>
                </ListItem>
                {visible && legendItems && (
                    <LayerMenuDiscriminatorInfo
                        text={getDiscriminatorText(discriminator)}
                        legendItems={legendItems}
                    />
                )}
            </>
        )
    );
};

export default LayerMenu;
