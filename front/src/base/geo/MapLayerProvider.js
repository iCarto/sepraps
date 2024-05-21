import {useEffect, useState} from "react";
import {useMapConfig} from "./provider";
import {useDownload} from "base/file/utilities";
import {ServiceRequestFormat} from "base/api/utilities";

export function useMapLayerProvider(service, layer, options = null) {
    const download = useDownload();

    const {mapFilter} = useMapConfig();

    // Core state
    const [items, setItems] = useState(options?.items || null);
    const [sector, setSector] = useState(options?.sector);
    const [loading, setLoading] = useState(false);

    const [included, setIncluded] = useState(options?.included);
    const [visible, setVisible] = useState(
        options?.visible != null ? options?.visible : true
    );
    const [discriminator, setDiscriminator] = useState(options?.discriminator || null);

    const showLayer = show => {
        if (!visible && show && items == null) {
            loadMapData();
        }
        setVisible(show);
    };

    // Selected and highlighted state
    const [featureHideFilters, setFeatureHideFilters] = useState(
        options?.featureFilters || null
    );
    const addFeatureHideFilter = hideFilterFn =>
        setFeatureHideFilters(oldFeatureHideFilters => {
            let newFeatureHideFilters =
                oldFeatureHideFilters !== null ? [...oldFeatureHideFilters] : [];
            if (newFeatureHideFilters.indexOf(hideFilterFn) === -1) {
                newFeatureHideFilters.push(hideFilterFn);
            }
            return newFeatureHideFilters;
        });
    const removeFeatureHideFilter = hideFilterFn =>
        setFeatureHideFilters(oldFeatureHideFilters => {
            let newFeatureHideFilters =
                oldFeatureHideFilters !== null ? [...oldFeatureHideFilters] : [];
            let idx = newFeatureHideFilters.indexOf(hideFilterFn);
            if (idx !== -1) {
                newFeatureHideFilters.splice(idx, 1);
            }
            return newFeatureHideFilters;
        });
    const [customLoader, setCustomLoader] = useState(options?.customLoader || null);
    const [customClickHandler, setCustomClickHandler] = useState(
        () => options?.customClickHandler || null
    );
    const [superHighlightId, setSuperHighlightId] = useState(
        options?.superHighlightId || null
    );
    const [highlightIds, setHighlightIds] = useState(options?.highlightIds || null);
    const addHighlightId = id =>
        setHighlightIds(oldHighlightIds => {
            let newHighlightIds = oldHighlightIds !== null ? [...oldHighlightIds] : [];
            if (newHighlightIds.indexOf(id) === -1) {
                newHighlightIds.push(id);
            }
            return newHighlightIds;
        });
    const removeHighlightId = id =>
        setHighlightIds(oldHighlightIds => {
            let newHighlightIds = oldHighlightIds !== null ? [...oldHighlightIds] : [];
            let idx = newHighlightIds.indexOf(id);
            if (idx !== -1) {
                newHighlightIds.splice(idx, 1);
            }
            return newHighlightIds;
        });
    const [selectedIds, setSelectedIds] = useState(options?.selectedIds || null);
    const addSelectedId = id =>
        setSelectedIds(oldSelectedIds => {
            let newSelectedIds = oldSelectedIds !== null ? [...oldSelectedIds] : [];
            if (newSelectedIds.indexOf(id) === -1) {
                newSelectedIds.push(id);
            }
            return newSelectedIds;
        });
    const removeSelectedId = id =>
        setSelectedIds(oldSelectedIds => {
            let newSelectedIds = oldSelectedIds !== null ? [...oldSelectedIds] : [];
            let idx = newSelectedIds.indexOf(id);
            if (idx !== -1) {
                newSelectedIds.splice(idx, 1);
            }
            return newSelectedIds;
        });

    if (layer?.legend) {
        layer.legend.setFeatureHideFilterFns(
            addFeatureHideFilter,
            removeFeatureHideFilter
        );
    }

    // Load data actions
    const loadMapData = () => {
        setLoading(true);
        (customLoader == null ? service.getFeatures(mapFilter) : customLoader).then(
            elements => {
                setItems(elements);
                setLoading(false);
            }
        );
    };

    const loadTableData = () => {
        return service.getList(mapFilter);
    };

    const downloadShapefile = () => {
        if (!customLoader) {
            service
                .getList(mapFilter, null, null, ServiceRequestFormat.SHP)
                .then(response => {
                    download(response);
                })
                .catch(error => {
                    console.log({error});
                });
        }
    };

    return [
        {
            items,
            setItems,
            sector,
            loading,
            customLoader,
            setCustomLoader,
            included,
            setIncluded,
            visible,
            showLayer,
            discriminator,
            setDiscriminator,
            featureHideFilters,
            setFeatureHideFilters,
            addFeatureHideFilter,
            removeFeatureHideFilter,
            customClickHandler,
            setCustomClickHandler,
            superHighlightId,
            setSuperHighlightId,
            highlightIds,
            setHighlightIds,
            addHighlightId,
            removeHighlightId,
            selectedIds,
            setSelectedIds,
            addSelectedId,
            removeSelectedId,
            loadMapData,
            loadTableData,
            downloadShapefile,
            layer,
            useProvider: function () {
                useEffect(() => {
                    console.log("repainting");
                    if (visible && included) {
                        layer.updateLayer(
                            items,
                            discriminator,
                            featureHideFilters,
                            selectedIds,
                            highlightIds,
                            superHighlightId,
                            customClickHandler
                        );
                    }
                }, [
                    items,
                    discriminator,
                    featureHideFilters,
                    selectedIds,
                    highlightIds,
                    superHighlightId,
                    customClickHandler,
                ]);

                useEffect(() => {
                    if (!visible || !included) {
                        layer.clearLayer();
                    } else {
                        layer.updateLayer(
                            items,
                            discriminator,
                            featureHideFilters,
                            selectedIds,
                            highlightIds,
                            superHighlightId,
                            customClickHandler
                        );
                    }
                }, [included, visible]);

                // Always reset the filters if the discriminator changes
                useEffect(() => {
                    setFeatureHideFilters(null);
                }, [discriminator]);

                // Load data again if filter is changed
                useEffect(() => {
                    if (visible && included) {
                        loadMapData();
                    }
                }, [mapFilter]);
            },
        },
    ];
}
