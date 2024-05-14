import {useRef} from "react";
import L from "leaflet";
import {getLeafletPolyMarker} from "base/geo/libraries/leaflet-polymarker";
import {getMuiIcon} from "base/geo/libraries/leaflet-polymarker";

class Legend {
    #discriminatorsAttributes;
    #discriminatorsLegends;
    #layerName;
    #menuIconShape;

    constructor(
        layerName,
        menuIconShape,
        discriminatorsAttributes,
        discriminatorsLegends
    ) {
        this.#discriminatorsAttributes = discriminatorsAttributes;
        this.#discriminatorsLegends = discriminatorsLegends;
        this.#layerName = layerName;
        this.#menuIconShape = menuIconShape;
    }

    get discriminators() {
        return this.#discriminatorsAttributes;
    }

    get discriminatorsLegends() {
        return this.#discriminatorsLegends;
    }

    get layerName() {
        return this.#layerName;
    }

    get menuIconShape() {
        return this.#menuIconShape;
    }

    setFeatureHideFilterFns(addFeatureHideFilterFn, removeFeatureHideFilterFn) {
        this.#discriminatorsLegends.forEach(e =>
            e.setFeatureHideFilterFns(addFeatureHideFilterFn, removeFeatureHideFilterFn)
        );
    }

    getMarkerOptions(feature, discriminator = null) {
        let discriminatorLegend = this.getDiscriminatorLegend(discriminator);
        return discriminatorLegend ? discriminatorLegend.getMarkerOptions(feature) : {};
    }

    getDiscriminatorLegend(discriminator) {
        return this.#discriminatorsLegends.find(d => d.field === discriminator);
    }
}

class LegendDiscriminator {
    #field;
    #getDefaultIconFn;
    #entries;
    #text;
    #getValueFn;

    constructor(
        text,
        field,
        getValueFn,
        getDefaultIconFn,
        defaultIconOptions,
        entries
    ) {
        this.#field = field;
        this.#getDefaultIconFn = getDefaultIconFn
            ? getDefaultIconFn
            : () => getMuiIcon(defaultIconOptions);
        this.#entries = entries;
        this.#text = text;
        this.#getValueFn = getValueFn
            ? getValueFn
            : feature => (field !== null ? feature.properties[field] : null);

        this.#entries.forEach(e => e.setValueGetterFn(this.#getValueFn));
    }

    get field() {
        return this.#field;
    }

    get getDefaultIcon() {
        return this.#getDefaultIconFn;
    }

    get entries() {
        return this.#entries;
    }

    get text() {
        return this.#text;
    }

    get getValueFn() {
        return this.#getValueFn;
    }

    setFeatureHideFilterFns(addFeatureHideFilterFn, removeFeatureHideFilterFn) {
        this.#entries.forEach(e =>
            e.setFeatureHideFilterFns(addFeatureHideFilterFn, removeFeatureHideFilterFn)
        );
    }

    getMarkerOptions(feature) {
        let entry = this.#entries.find(e => e.filterFn(feature));
        return entry ? entry.markerOptions : {};
    }
}

class LegendDiscriminatorEntry {
    #innerFilterFn;
    #getIconFn;
    #markerOptions;
    #text;
    #filterFn = null;
    #toggleFn = null;

    constructor(text, innerFilterFn, getIconFn, markerOptions) {
        this.#innerFilterFn = innerFilterFn ? innerFilterFn : () => true;
        this.#getIconFn = getIconFn ? getIconFn : () => getMuiIcon(markerOptions);
        this.#markerOptions = markerOptions;
        this.#text = text;
    }

    get innerFilterFn() {
        return this.#innerFilterFn;
    }

    get filterFn() {
        return this.#filterFn;
    }

    get getIcon() {
        return this.#getIconFn;
    }

    get markerOptions() {
        return this.#markerOptions;
    }

    get text() {
        return this.#text;
    }

    get toggleFn() {
        return this.#toggleFn;
    }

    setValueGetterFn(getValueFn) {
        this.#filterFn = feature => this.#innerFilterFn(getValueFn(feature));
    }

    setFeatureHideFilterFns(addFeatureHideFilterFn, removeFeatureHideFilterFn) {
        this.#toggleFn = visible =>
            visible
                ? removeFeatureHideFilterFn(this.#filterFn)
                : addFeatureHideFilterFn(this.#filterFn);
    }
}

/**
 * Create layer legend.
 *
 * Creates a full layer legend object by providing a structured object with its basic info.
 *
 * Some examples of valid objects with the legend info:
 *
 * A simple default legend with just one entry:
 *
 * {
 *  layerName: "Acuiculturas",
 *  menuIconShape: "H",
 *  defaultMarkerOptions: {
 *      marker: "H",
 *      fillColor: "#d56e56",
 *      radius: 10,
 *      color: "#000",
 *      weight: 1,
 *      opacity: 0.3,
 *      fillOpacity: 0.9,
 *      pane: mapOverlayPanes[5],
 *  }
 * }
 *
 * A more complex legend with several discriminators:
 *
 * const markerBaseOptions = {
 *     marker: "s",
 *     fillColor: "#44bba4",
 *     radius: 10,
 *     color: "#000",
 *     weight: 1,
 *     opacity: 0.3,
 *     fillOpacity: 0.9,
 *     pane: mapOverlayPanes[9],
 * };
 *
 * const discriminators = Object.freeze({
 *     ESTADO: "estado",
 *     PRETRATAMENTO: "pretratamento",
 *     ABASTECEMENTO_AUTONOMO: "abastecemento_autonomo",
 * });
 *
 * createLayerLegend({
 *     layerName: "ETAPs",
 *     menuIconShape: markerBaseOptions.marker,
 *     discriminatorsAttributes: discriminators,
 *     discriminatorsLegends: [
 *         {
 *             field: discriminators.ESTADO,
 *             text: "Estado",
 *             defaultIconOptions: markerBaseOptions,
 *             entries: [
 *                 {
 *                     text: "Bo",
 *                     filterFn: val => val === 1,
 *                     markerOptions: {...markerBaseOptions, radius: 13},
 *                 },
 *                 {
 *                     text: "Regular",
 *                     filterFn: val => val === 2,
 *                     markerOptions: {...markerBaseOptions, radius: 11},
 *                 },
 *                 {
 *                     text: "Malo",
 *                     filterFn: val => val === 3,
 *                     markerOptions: {...markerBaseOptions, radius: 9},
 *                 },
 *                 {
 *                     text: "(sen datos)",
 *                     filterFn: val => val === null,
 *                     markerOptions: {
 *                         ...markerBaseOptions,
 *                         fillColor: "lightgrey",
 *                         radius: 5,
 *                     },
 *                 },
 *             ],
 *         },
 *         {
 *             field: discriminators.PRETRATAMENTO,
 *             text: "Pretratamento",
 *             defaultIconOptions: markerBaseOptions,
 *             entries: [
 *                 {
 *                     text: "Si",
 *                     filterFn: val => val === 1,
 *                     markerOptions: {...markerBaseOptions, radius: 13},
 *                 },
 *                 {
 *                     text: "Non",
 *                     filterFn: val => val === 0,
 *                     markerOptions: {...markerBaseOptions, radius: 10},
 *                 },
 *                 {
 *                     text: "(sen datos)",
 *                     filterFn: val => val === null,
 *                     markerOptions: {
 *                         ...markerBaseOptions,
 *                         fillColor: "lightgrey",
 *                         radius: 5,
 *                     },
 *                 },
 *             ],
 *         },
 *         {
 *             field: discriminators.ABASTECEMENTO_AUTONOMO,
 *             text: "Abast. autónomo",
 *             defaultIconOptions: markerBaseOptions,
 *             entries: [
 *                 {
 *                     text: "Non",
 *                     filterFn: val => !val,
 *                     markerOptions: {...markerBaseOptions, radius: 10},
 *                 },
 *                 {
 *                     text: "Si",
 *                     filterFn: val => val,
 *                     markerOptions: {...markerBaseOptions, radius: 6},
 *                 },
 *             ],
 *         },
 *     ],
 * })
 *
 * @param {Object} obj An object.
 * @param {string} obj.layerName Name of the layer.
 * @param {string} [obj.menuIconShape=null] Character of the icon we want to show for this layer on the main menu (not the legend). Character must be accepted by function getMuiIcon from leaflet-polymarker.
 * @param {Object} [obj.discriminatorsAttributes={}] Object with the discriminators we want to use as key-values, with the values being the field names. Intended to be used to reference individual discriminators on menus and such.
 * @param {Object} [obj.defaultMarkerOptions=null] Object with the marker options we want to use in the viewer for all features. Intended to be used only when the layer has no real discriminators and no real legends are passed via discriminatorsLegends. It's also used by default for generating the legend icon, unless defaultIconOptions is provided as well.
 * @param {Object} [obj.defaultIconOptions=null] Object with the icon options that will be used for the default icon to show in the legend, by passing them to getMuiIcon. Intended to be used only when the layer has no real discriminators and no real legends are passed via discriminatorsLegends.
 * @param {Object[]} [obj.discriminatorsLegends=[]] Array of objects with the individual legends for the discriminators. Can be ignored for layers with just one legend and no real discriminators, using instead the parameters defaultMarkerOptions and defaultIconOptions. If provided, the discriminator legend objects must comply with the following syntax:
 * @param {string} [obj.discriminatorsLegends[].text=null] Text to display for this discriminator. Can be ignored for layers with just one legend and no real discriminators.
 * @param {string} [obj.discriminatorsLegends[].field=null] Field referenced by this discriminator. Can be ignored for layers with just one legend and no real discriminators.
 * @param {function} [obj.discriminatorsLegends[].getValueFn=null] Function used for retrieving the value we will use for the discriminator. By default it simply looks for the field parameter inside the feature's properties. Can be ignored for layers with just one legend and no real discriminators.
 * @param {function} [obj.discriminatorsLegends[].getDefaultIconFn=null] Function used for obtaining the default icon to show in the legend for this discriminator. By default it simply calls getMuiIcon with the provided defaultIconOptions. Can be ignored for layers with just one legend and no real discriminators.
 * @param {Object} [obj.discriminatorsLegends[].defaultIconOptions={}] Object with the icon options that will be used for the default icon to show in the legend for this discriminator, by passing them to getMuiIcon. Can be ignored for layers with just one legend and no real discriminators.
 * @param {Object[]} obj.discriminatorsLegends[].entries Array of objects with the individual entries for this discriminator legend. We always need at least one entry. They must comply with the following syntax:
 * @param {string} [obj.discriminatorsLegends[].entries[].text=null] Text to display for this discriminator entry. Can be ignored for layers with just one legend and no real discriminators.
 * @param {function} [obj.discriminatorsLegends[].entries[].filterFn=null] Function that receives the value used for this discriminator and must return true when the feature fits this entry of the discriminator. Can be ignored for layers with just one legend and no real discriminators.
 * @param {function} [obj.discriminatorsLegends[].entries[].getIconFn=null] Function used for obtaining the default icon to show in the legend for this discriminator entry. By default it simply calls getMuiIcon with the provided markerOptions. Can be ignored for layers with just one legend and no real discriminators.
 * @param {Object} obj.discriminatorsLegends[].entries[].markerOptions Object with the marker options we want to use in the viewer for features that fall under this discriminator entry. It's also used by default for generating the legend icon.
 *
 * @return {Legend} The layer legend object.
 */
export function createLayerLegend({
    layerName,
    menuIconShape = null,
    discriminatorsAttributes = {},
    discriminatorsLegends = [],
    defaultMarkerOptions = null,
    defaultIconOptions = null,
}) {
    let discriminatorsLegendsObjects =
        discriminatorsLegends && discriminatorsLegends.length > 0
            ? discriminatorsLegends.map(
                  ({
                      text = null,
                      field = null,
                      getValueFn = null,
                      getDefaultIconFn = null,
                      defaultIconOptions = {},
                      entries,
                  }) => {
                      // Check that the referenced field is included in the discriminators list object
                      if (
                          field !== null &&
                          Object.entries(discriminatorsAttributes).filter(
                              e => e[1] === field
                          ).length === 0
                      ) {
                          throw new Error(
                              'Legend for layer "' +
                                  layerName +
                                  '" includes reference to unknown discriminator "' +
                                  field +
                                  '".'
                          );
                      }
                      let discriminatorsLegendEntriesObjects = entries.map(
                          ({
                              text = null,
                              filterFn = null,
                              getIconFn = null,
                              markerOptions,
                          }) =>
                              new LegendDiscriminatorEntry(
                                  text,
                                  filterFn,
                                  getIconFn,
                                  markerOptions
                              )
                      );
                      return new LegendDiscriminator(
                          text,
                          field,
                          getValueFn,
                          getDefaultIconFn,
                          defaultIconOptions,
                          discriminatorsLegendEntriesObjects
                      );
                  }
              )
            : [
                  new LegendDiscriminator(
                      null,
                      null,
                      null,
                      null,
                      defaultIconOptions ? defaultIconOptions : defaultMarkerOptions,
                      [
                          new LegendDiscriminatorEntry(
                              null,
                              null,
                              null,
                              defaultMarkerOptions
                          ),
                      ]
                  ),
              ];
    return new Legend(
        layerName,
        menuIconShape,
        discriminatorsAttributes,
        discriminatorsLegendsObjects
    );
}

export class Layer {
    #layerRef;
    #mapRef;
    #legend;
    #detail;
    #zoomOnDetail;
    #maxZoomOnDetail;
    #highlightMarkerOptions;
    #getHighlightMarkerOptions;
    #superHighlightMarkerOptions;
    #getSuperHighlightMarkerOptions;
    #selectedMarkerOptions;
    #getSelectedMarkerOptions;
    #getTooltip;
    #bindTooltip;
    #defaultOnClick;
    #bindOnClick;
    #onMouseOver;
    #bindOnMouseOver;
    #onMouseOut;
    #bindOnMouseOut;
    #addCustomLayerOptions;
    #getCustomMarkerOptions;

    get layerRef() {
        return this.#layerRef;
    }

    get mapRef() {
        return this.#mapRef;
    }

    get legend() {
        return this.#legend;
    }

    constructor(
        legend,
        layerRef,
        mapRef,
        detail,
        zoomOnDetail,
        maxZoomOnDetail,
        highlightMarkerOptions,
        getHighlightMarkerOptions,
        superHighlightMarkerOptions,
        getSuperHighlightMarkerOptions,
        selectedMarkerOptions,
        getSelectedMarkerOptions,
        getTooltip,
        bindTooltip,
        defaultOnClick,
        bindOnClick,
        onMouseOver,
        bindOnMouseOver,
        onMouseOut,
        bindOnMouseOut,
        addCustomLayerOptions,
        getCustomMarkerOptions
    ) {
        this.#layerRef = layerRef;
        this.#mapRef = mapRef;

        this.#legend = legend;
        this.#detail = detail;
        this.#zoomOnDetail = zoomOnDetail;
        this.#maxZoomOnDetail = maxZoomOnDetail;
        this.#highlightMarkerOptions = highlightMarkerOptions;
        this.#getHighlightMarkerOptions = getHighlightMarkerOptions
            ? getHighlightMarkerOptions
            : ({options}) => {
                  return {...options, ...this.#highlightMarkerOptions};
              };
        this.#superHighlightMarkerOptions = superHighlightMarkerOptions;
        this.#getSuperHighlightMarkerOptions = getSuperHighlightMarkerOptions
            ? getSuperHighlightMarkerOptions
            : ({options}) => {
                  return {...options, ...this.#superHighlightMarkerOptions};
              };
        this.#selectedMarkerOptions = selectedMarkerOptions;
        this.#getSelectedMarkerOptions = getSelectedMarkerOptions
            ? getSelectedMarkerOptions
            : ({options}) => {
                  return {...options, ...this.#selectedMarkerOptions};
              };
        this.#getTooltip = getTooltip;
        this.#bindTooltip = bindTooltip ? bindTooltip : ({detail}) => !detail;
        this.#defaultOnClick = defaultOnClick;
        this.#bindOnClick = bindOnClick ? bindOnClick : ({detail}) => !detail;
        this.#onMouseOver = onMouseOver;
        this.#bindOnMouseOver = bindOnMouseOver
            ? bindOnMouseOver
            : ({detail}) => !detail;
        this.#onMouseOut = onMouseOut;
        this.#bindOnMouseOut = bindOnMouseOut ? bindOnMouseOut : ({detail}) => !detail;
        this.#addCustomLayerOptions = addCustomLayerOptions
            ? addCustomLayerOptions
            : options => options;
        this.#getCustomMarkerOptions = getCustomMarkerOptions
            ? getCustomMarkerOptions
            : ({options}) => options;
    }

    #getMarkerOptions(
        feature,
        discriminator,
        selected = false,
        highlight = false,
        superHighlight = false
    ) {
        let detail = this.#detail;
        let options = this.#legend.getMarkerOptions(feature, discriminator);
        if (highlight && this.#getHighlightMarkerOptions) {
            options = this.#getHighlightMarkerOptions({
                feature,
                discriminator,
                detail,
                options,
            });
        }
        if (superHighlight && this.#getSuperHighlightMarkerOptions) {
            options = this.#getSuperHighlightMarkerOptions({
                feature,
                discriminator,
                detail,
                options,
            });
        }
        if (selected && this.#getSelectedMarkerOptions) {
            options = this.#getSelectedMarkerOptions({
                feature,
                discriminator,
                detail,
                options,
            });
        }
        if (feature.properties.pending_status != null) {
            options = {...options, weight: 3, color: "red", opacity: 1};
        }
        return this.#getCustomMarkerOptions({
            feature,
            discriminator,
            detail,
            selected,
            highlight,
            superHighlight,
            options,
        });
    }

    createLayer(map) {
        map.removeLayer(this.layerRef.current);
        this.layerRef.current.addTo(map);
        this.mapRef.current = map;
    }

    updateLayer(
        geojson,
        discriminator,
        featureHideFilters = null,
        selectedIds = null,
        highlightIds = null,
        superHighlightId = null,
        customClickHandler = null
    ) {
        this.clearLayer();

        let detail = this.#detail;

        const geojsonLayer = L.Proj.geoJson(
            geojson,
            this.#addCustomLayerOptions({
                onEachFeature: (feature, layer) => {
                    if (
                        this.#bindTooltip &&
                        this.#getTooltip &&
                        this.#bindTooltip({feature, discriminator, detail, layer})
                    ) {
                        layer.bindTooltip(
                            this.#getTooltip({
                                feature,
                                discriminator,
                                detail,
                                layer,
                            })
                        );
                    }
                    if (
                        this.#bindOnClick &&
                        (this.#defaultOnClick || customClickHandler) &&
                        this.#bindOnClick({feature, discriminator, detail, layer})
                    ) {
                        layer.on("click", () => {
                            return customClickHandler != null
                                ? customClickHandler({
                                      feature,
                                      discriminator,
                                      detail,
                                      layer,
                                  })
                                : this.#defaultOnClick({
                                      feature,
                                      discriminator,
                                      detail,
                                      layer,
                                  });
                        });
                    }
                    if (
                        this.#bindOnMouseOver &&
                        this.#onMouseOver &&
                        this.#bindOnMouseOver({
                            feature,
                            discriminator,
                            detail,
                            layer,
                        })
                    ) {
                        layer.on("mouseover", () =>
                            this.#onMouseOver({
                                feature,
                                discriminator,
                                detail,
                                layer,
                            })
                        );
                    }
                    if (
                        this.#bindOnMouseOut &&
                        this.#onMouseOut &&
                        this.#bindOnMouseOut({
                            feature,
                            discriminator,
                            detail,
                            layer,
                        })
                    ) {
                        layer.on("mouseout", () =>
                            this.#onMouseOut({
                                feature,
                                discriminator,
                                detail,
                                layer,
                            })
                        );
                    }
                },
                filter: function(feature) {
                    if (featureHideFilters) {
                        for (let hideFilterFn of featureHideFilters) {
                            if (hideFilterFn(feature)) {
                                return false;
                            }
                        }
                    }
                    return true;
                },
                style: feature =>
                    this.#getMarkerOptions(
                        feature,
                        discriminator,
                        selectedIds !== null && selectedIds.indexOf(feature.id) !== -1,
                        highlightIds !== null &&
                            highlightIds.indexOf(feature.id) !== -1,
                        superHighlightId !== null && superHighlightId === feature.id
                    ),
                pointToLayer: (feature, latlng) => {
                    return getLeafletPolyMarker(
                        latlng,
                        this.#getMarkerOptions(
                            feature,
                            discriminator,
                            selectedIds !== null &&
                                selectedIds.indexOf(feature.id) !== -1,
                            highlightIds !== null &&
                                highlightIds.indexOf(feature.id) !== -1,
                            superHighlightId !== null && superHighlightId === feature.id
                        )
                    );
                },
            })
        ).addTo(this.#layerRef.current);

        if (geojson && this.#detail && this.#zoomOnDetail) {
            this.#mapRef.current.fitBounds(geojsonLayer.getBounds());
        }
    }

    clearLayer() {
        this.#layerRef.current.clearLayers();
    }
}

/**
 * Create a layer with the provided legend and options.
 *
 * Creates a full layer object by providing a structured object with its Legend object and custom options. See createLayerLegend for detailed explanations about how to create a Legend object.
 *
 * The Layer will apply the marker options in order by overriding attributes defined by previous steps. The order goes like this:
 *  1 - It starts by obtaining the base marker options from the Legend by its getMarkerOptions function.
 *  2 - If the feature is marked for highlighting and we have the corresponding function for obtaining the related marker options, it overrides previously defined options with those.
 *  3 - If the feature is marked for super highlighting and we have the corresponding function for obtaining the related marker options, it overrides previously defined options with those.
 *  4 - If the feature is selected and we have the corresponding function for obtaining the related marker options, it overrides previously defined options with those.
 *  5 - If we provided a getCustomMarkerOptions function, this one is called last with several parameters as attributes of a plain object, including the marker options obtained so far, and it must simply return a marker options object, whether it's based on the previously defined options or not.
 *
 * Some examples of valid objects with the layer options:
 *
 * A simple layer with just a tooltip and a URL navigation when clicking onto a feature:
 *
 * {
 *      legend: LayerLegend,
 *      getTooltip: feature => {
 *          let data = feature.properties;
 *          let tooltip = `<b>Bombeo: ${
 *              data["nome"] ? data["nome"] : "---"
 *          }</b><ul class="attributes">`;
 *          tooltip += `<li><i>Código</i>: ${data["codigo"] ? data["codigo"] : "---"}</li>`;
 *          tooltip += `<li><i>Concello</i>: ${
 *              data["concello_label"] ? data["concello_label"] : "---"
 *          }</li>`;
 *          tooltip += `<li><i>Aglomeración</i>: ${data["aglomeracion_label"]}</li>`;
 *          return tooltip + "</ul>";
 *      },
 *      defaultOnClick: feature => navigate(`info/bombeos/${feature.id}`)
 * }
 *
 * A more complex layer with a tooltip, URL navigation when clicking onto a feature, custom marker options for detail views and mouseover and mouseout events:
 *
 * {
 *      legend: LayerLegend,
 *      detail: detail,
 *      getTooltip: feature => {
 *          let data = feature.properties;
 *          let tooltip = `<b>Polígono: ${
 *              data["nome"] ? data["nome"] : "---"
 *          }</b><ul class="attributes">`;
 *          tooltip += `<li><i>Superficie</i>: ${
 *              data.superficie ? `${NumberUtil.formatDecimal2(data.superficie)} ha` : "---"
 *          }</li>`;
 *          tooltip += `<li><i>Grado de ocupación</i>: ${
 *              data.grado_ocupacion
 *                  ? `${NumberUtil.formatDecimal2(data.grado_ocupacion)} %`
 *                  : "---"
 *          }</li>`;
 *          return tooltip + "</ul>";
 *      },
 *      getCustomMarkerOptions: ({options}) => detail ? {...options, weight: 3, opacity: 1} : options,
 *      defaultOnClick: feature => navigate(`info/poligonos/${feature.id}`),
 *      onMouseOver: (feature, discriminator, detail, layer) =>
 *          layer.setStyle({
 *              weight: 2,
 *          }),
 *      onMouseOut: (feature, discriminator, detail, layer) =>
 *          layer.setStyle({
 *              weight: 1,
 *          })
 * }
 *
 * @param {Object} obj An object.
 * @param {Legend} obj.legend A Legend object to apply to this layer for styling purposes. See createLayerLegend.
 * @param {boolean} [obj.detail=false] Flag indicating whether this layer is displaying detail data (i.e. usually just one feature). This will be used for other functionalities, which include zooming onto the layer by default and disabling event related options. By default, false.
 * @param {boolean} [obj.zoomOnDetail=true] Flag indicating whether we want the map to be fit onto the layer bounds at startup, so the detailed element is zoomed into. Only applies when detail is true. By default, true.
 * @param {number} [obj.maxZoomOnDetail=7] Integer indicating the max zoom we want to use when fitting tha map onto this layer's bounds at startup. Only applies when detail is true. By default, 7.
 * @param {Object} [obj.highlightMarkerOptions={}] Object with marker options that will be applied to the marker when its feature is marked for highlighting. By default, an empty object.
 * @param {function} [obj.getHighlightMarkerOptions=null] Function for obtaining the marker options to be used when a feature is marked for highlighting. Function can accept four parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "options": the current marker options.
 *
 * And must return the desired marker options. By default, the object will create a function that takes the current marker options and mixes it with the provided params via highlightMarkerOptions.
 * @param {Object} [obj.superHighlightMarkerOptions={}] Object with marker options that will be applied to the marker when its feature is marked for super highlighting. By default, an empty object.
 * @param {function} [obj.getSuperHighlightMarkerOptions=null] Function for obtaining the marker options to be used when a feature is marked for super highlighting. Function can accept four parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "options": the current marker options.
 *
 * And must return the desired marker options. By default, the object will create a function that takes the current marker options and mixes it with the provided params via superHighlightMarkerOptions.
 * @param {Object} [obj.selectedMarkerOptions={}] Object with marker options that will be applied to the marker when its feature is selected. By default, an empty object.
 * @param {function} [obj.getSelectedMarkerOptions=null] Function for obtaining the marker options to be used when a feature is selected. Function can accept four parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "options": the current marker options.
 *
 * And must return the desired marker options. By default, the object will create a function that takes the current marker options and mixes it with the provided params via selectedMarkerOptions.
 * @param {function} [obj.bindTooltip=null] Function for checking whether the current feature should be bound a tooltip (obtained via the provided getTooltip param). Function can accept four parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "layer": the current feature's Leaflet layer.
 *
 * And must return a boolean indicating whether a tooltip should be bound. Only has any real effect when getTooltip is provided. By default, if getTooltip is provided, we always show the tooltip unless the current layer is a detail one.
 * @param {function} [obj.getTooltip=null] Function for obtaining the content of the tooltip to show for a marker. Function can accept four parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "layer": the current feature's Leaflet layer.
 *
 * And must return the tooltip contents as a string. By default, no tooltip is shown.
 * @param {function} [obj.bindOnClick=null] Function for checking whether the current feature should have some function bound to its onclick event (obtained via the provided defaultOnClick param OR the customClickHandler managed by MapLayerProvider, taking precedence the latter). Function can accept four parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "layer": the current feature's Leaflet layer.
 *
 * And must return a boolean indicating whether function should be bound to the onclick event. Only has any real effect when either defaultOnClick is provided or we externally set the value of customClickHandler via MapLayerProvider. By default, if we have an actual function to bind, we always do it unless the current layer is a detail one.
 * @param {function} [obj.defaultOnClick=null] Function to execute when the marker is clicked onto. Function can accept four parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "layer": the current feature's Leaflet layer.
 *
 * By default, no default function is bound, but it can be externally defined by setting the value of customClickHandler via MapLayerProvider.
 * @param {function} [obj.bindOnMouseOver=null] Function for checking whether the current feature should have some function bound to its mouseover event (obtained via the provided onMouseOver param). Function can accept four parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "layer": the current feature's Leaflet layer.
 *
 * And must return a boolean indicating whether function should be bound to the mouseover event. Only has any real effect when onMouseOver is provided. By default, if onMouseOver is provided, we always bind the function unless the current layer is a detail one.
 * @param {function} [obj.onMouseOver=null] Function to execute when the mouse cursor hovers over the marker. Function can accept four parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "layer": the current feature's Leaflet layer.
 *
 * By default, no function is bound.
 * @param {function} [obj.bindOnMouseOut=null] Function for checking whether the current feature should have some function bound to its mouseout event (obtained via the provided onMouseOut param). Function can accept four parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "layer": the current feature's Leaflet layer.
 *
 * Only has any real effect when onMouseOut is provided. By default, if onMouseOut is provided, we always bind the function unless the current layer is a detail one.
 * @param {function} [obj.onMouseOut=null] Function to execute when the mouse cursor hovers out of the marker. Function can accept four parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "layer": the current feature's Leaflet layer.
 *
 * By default, no function is bound.
 * @param {function} [obj.getCustomMarkerOptions=null] Function to be used if we require additional control over the marker options. Function can accept seven parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "selected": a boolean indicating whether the feature is selected.
 * - "highlight": a boolean indicating whether the feature is marked for highlighting.
 * - "superHighlight": a boolean indicating whether the feature is marked for super highlighting.
 * - "options": the current marker options.
 *
 * And it should return the desired marker options. By default, marker options are not customized and just returned as they result from the other customization options.
 * @param {function} [obj.addCustomLayerOptions=null] Function to be used for providing Leaflet with additional layer options when creating the GeoJSON layer. Function accepts one parameter: the current layer options, and should return the desired final layer options to pass to Leaflet. By default, no additional layer options are added and the options are just returned as they result from the other customization options.
 *
 * @return {Layer} The layer object.
 */
export function useLayerObject({
    legend,
    detail = false,
    zoomOnDetail = true,
    maxZoomOnDetail = 7,
    highlightMarkerOptions = {},
    getHighlightMarkerOptions = null,
    superHighlightMarkerOptions = {},
    getSuperHighlightMarkerOptions = null,
    selectedMarkerOptions = {},
    getSelectedMarkerOptions = null,
    bindTooltip = null,
    getTooltip = null,
    bindOnClick = null,
    defaultOnClick = null,
    bindOnMouseOver = null,
    onMouseOver = null,
    bindOnMouseOut = null,
    onMouseOut = null,
    getCustomMarkerOptions = null,
    addCustomLayerOptions = null,
}) {
    return new Layer(
        legend,
        useRef(L.layerGroup()),
        useRef(null),
        detail,
        zoomOnDetail,
        maxZoomOnDetail,
        highlightMarkerOptions,
        getHighlightMarkerOptions,
        superHighlightMarkerOptions,
        getSuperHighlightMarkerOptions,
        selectedMarkerOptions,
        getSelectedMarkerOptions,
        getTooltip,
        bindTooltip,
        defaultOnClick,
        bindOnClick,
        onMouseOver,
        bindOnMouseOver,
        onMouseOut,
        bindOnMouseOut,
        addCustomLayerOptions,
        getCustomMarkerOptions
    );
}

/**
 * Create a full layer and its legend with the provided options.
 *
 * @param {Object} obj An object.
 *
 * @param {Object} obj.legendOptions An object with the options for creating the legend. Must comply with the following structure (see createLayerLegend for detailed documentation and examples):
 * @param {string} obj.legendOptions.layerName Name of the layer.
 * @param {string} [obj.legendOptions.menuIconShape=null] Character of the icon we want to show for this layer on the main menu (not the legend). Character must be accepted by function getMuiIcon from leaflet-polymarker.
 * @param {Object} [obj.legendOptions.discriminatorsAttributes={}] Object with the discriminators we want to use as key-values, with the values being the field names. Intended to be used to reference individual discriminators on menus and such.
 * @param {Object} [obj.legendOptions.defaultMarkerOptions=null] Object with the marker options we want to use in the viewer for all features. Intended to be used only when the layer has no real discriminators and no real legends are passed via discriminatorsLegends. It's also used by default for generating the legend icon, unless defaultIconOptions is provided as well.
 * @param {Object} [obj.legendOptions.defaultIconOptions=null] Object with the icon options that will be used for the default icon to show in the legend, by passing them to getMuiIcon. Intended to be used only when the layer has no real discriminators and no real legends are passed via discriminatorsLegends.
 * @param {Object[]} [obj.legendOptions.discriminatorsLegends=[]] Array of objects with the individual legends for the discriminators. Can be ignored for layers with just one legend and no real discriminators, using instead the parameters defaultMarkerOptions and defaultIconOptions. If provided, the discriminator legend objects must comply with the following syntax:
 * @param {string} [obj.legendOptions.discriminatorsLegends[].text=null] Text to display for this discriminator. Can be ignored for layers with just one legend and no real discriminators.
 * @param {string} [obj.legendOptions.discriminatorsLegends[].field=null] Field referenced by this discriminator. Can be ignored for layers with just one legend and no real discriminators.
 * @param {function} [obj.legendOptions.discriminatorsLegends[].getValueFn=null] Function used for retrieving the value we will use for the discriminator. By default it simply looks for the field parameter inside the feature's properties. Can be ignored for layers with just one legend and no real discriminators.
 * @param {function} [obj.legendOptions.discriminatorsLegends[].getDefaultIconFn=null] Function used for obtaining the default icon to show in the legend for this discriminator. By default it simply calls getMuiIcon with the provided defaultIconOptions. Can be ignored for layers with just one legend and no real discriminators.
 * @param {Object} [obj.legendOptions.discriminatorsLegends[].defaultIconOptions={}] Object with the icon options that will be used for the default icon to show in the legend for this discriminator, by passing them to getMuiIcon. Can be ignored for layers with just one legend and no real discriminators.
 * @param {Object[]} obj.legendOptions.discriminatorsLegends[].entries Array of objects with the individual entries for this discriminator legend. We always need at least one entry. They must comply with the following syntax:
 * @param {string} [obj.legendOptions.discriminatorsLegends[].entries[].text=null] Text to display for this discriminator entry. Can be ignored for layers with just one legend and no real discriminators.
 * @param {function} [obj.legendOptions.discriminatorsLegends[].entries[].filterFn=null] Function that receives the value used for this discriminator and must return true when the feature fits this entry of the discriminator. Can be ignored for layers with just one legend and no real discriminators.
 * @param {function} [obj.legendOptions.discriminatorsLegends[].entries[].getIconFn=null] Function used for obtaining the default icon to show in the legend for this discriminator entry. By default it simply calls getMuiIcon with the provided markerOptions. Can be ignored for layers with just one legend and no real discriminators.
 * @param {Object} obj.legendOptions.discriminatorsLegends[].entries[].markerOptions Object with the marker options we want to use in the viewer for features that fall under this discriminator entry. It's also used by default for generating the legend icon.
 *
 * @param {Object} obj.layerOptions An object with the options for creating the layer (aside from the legend itself). Must comply with the following structure (see createLayer for detailed documentation and examples):
 * @param {boolean} [obj.layerOptions.detail=false] Flag indicating whether this layer is displaying detail data (i.e. usually just one feature). This will be used for other functionalities, which include zooming onto the layer by default and disabling event related options. By default, false.
 * @param {boolean} [obj.layerOptions.zoomOnDetail=true] Flag indicating whether we want the map to be fit onto the layer bounds at startup, so the detailed element is zoomed into. Only applies when detail is true. By default, true.
 * @param {number} [obj.layerOptions.maxZoomOnDetail=7] Integer indicating the max zoom we want to use when fitting tha map onto this layer's bounds at startup. Only applies when detail is true. By default, 7.
 * @param {Object} [obj.layerOptions.highlightMarkerOptions={}] Object with marker options that will be applied to the marker when its feature is marked for highlighting. By default, an empty object.
 * @param {function} [obj.layerOptions.getHighlightMarkerOptions=null] Function for obtaining the marker options to be used when a feature is marked for highlighting. Function can accept four parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "options": the current marker options.
 *
 * And must return the desired marker options. By default, the object will create a function that takes the current marker options and mixes it with the provided params via highlightMarkerOptions.
 * @param {Object} [obj.layerOptions.superHighlightMarkerOptions={}] Object with marker options that will be applied to the marker when its feature is marked for super highlighting. By default, an empty object.
 * @param {function} [obj.layerOptions.getSuperHighlightMarkerOptions=null] Function for obtaining the marker options to be used when a feature is marked for super highlighting. Function can accept four parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "options": the current marker options.
 *
 * And must return the desired marker options. By default, the object will create a function that takes the current marker options and mixes it with the provided params via superHighlightMarkerOptions.
 * @param {Object} [obj.layerOptions.selectedMarkerOptions={}] Object with marker options that will be applied to the marker when its feature is selected. By default, an empty object.
 * @param {function} [obj.layerOptions.getSelectedMarkerOptions=null] Function for obtaining the marker options to be used when a feature is selected. Function can accept four parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "options": the current marker options.
 *
 * And must return the desired marker options. By default, the object will create a function that takes the current marker options and mixes it with the provided params via selectedMarkerOptions.
 * @param {function} [obj.layerOptions.bindTooltip=null] Function for checking whether the current feature should be bound a tooltip (obtained via the provided getTooltip param). Function can accept four parameters: feature, current discriminator, a boolean indicating whether this is a detail layer and the current feature's Leaflet layer, and must return a boolean indicating whether a tooltip should be bound. Only has any real effect when getTooltip is provided. By default, if getTooltip is provided, we always show the tooltip unless the current layer is a detail one.
 * @param {function} [obj.layerOptions.getTooltip=null] Function for obtaining the content of the tooltip to show for a marker. Function can accept four parameters: feature, current discriminator, a boolean indicating whether this is a detail layer and the current feature's Leaflet layer, and must return the tooltip contents as a string. By default, no tooltip is shown.
 * @param {function} [obj.layerOptions.bindOnClick=null] Function for checking whether the current feature should have some function bound to its onclick event (obtained via the provided defaultOnClick param OR the customClickHandler managed by MapLayerProvider, taking precedence the latter). Function can accept four parameters: feature, current discriminator, a boolean indicating whether this is a detail layer and the current feature's Leaflet layer, and must return a boolean indicating whether function should be bound to the onclick event. Only has any real effect when either defaultOnClick is provided or we externally set the value of customClickHandler via MapLayerProvider. By default, if we have an actual function to bind, we always do it unless the current layer is a detail one.
 * @param {function} [obj.layerOptions.defaultOnClick=null] Function to execute when the marker is clicked onto. Function can accept four parameters: feature, current discriminator, a boolean indicating whether this is a detail layer and the current feature's Leaflet layer. By default, no default function is bound, but it can be externally defined by setting the value of customClickHandler via MapLayerProvider.
 * @param {function} [obj.layerOptions.bindOnMouseOver=null] Function for checking whether the current feature should have some function bound to its mouseover event (obtained via the provided onMouseOver param). Function can accept four parameters: feature, current discriminator, a boolean indicating whether this is a detail layer and the current feature's Leaflet layer, and must return a boolean indicating whether function should be bound to the mouseover event. Only has any real effect when onMouseOver is provided. By default, if onMouseOver is provided, we always bind the function unless the current layer is a detail one.
 * @param {function} [obj.layerOptions.onMouseOver=null] Function to execute when the mouse cursor hovers over the marker. Function can accept four parameters: feature, current discriminator, a boolean indicating whether this is a detail layer and the current feature's Leaflet layer. By default, no function is bound.
 * @param {function} [obj.layerOptions.bindOnMouseOut=null] Function for checking whether the current feature should have some function bound to its mouseout event (obtained via the provided onMouseOut param). Function can accept four parameters: feature, current discriminator, a boolean indicating whether this is a detail layer and the current feature's Leaflet layer, and must return a boolean indicating whether function should be bound to the mouseout event. Only has any real effect when onMouseOut is provided. By default, if onMouseOut is provided, we always bind the function unless the current layer is a detail one.
 * @param {function} [obj.layerOptions.onMouseOut=null] Function to execute when the mouse cursor hovers out of the marker. Function can accept four parameters: feature, current discriminator, a boolean indicating whether this is a detail layer and the current feature's Leaflet layer. By default, no function is bound.
 * @param {function} [obj.layerOptions.getCustomMarkerOptions=null] Function to be used if we require additional control over the marker options. Function can accept seven parameters passed as attributes of a plain object:
 *
 * - "feature": the feature.
 * - "discriminator": the current discriminator.
 * - "detail": a boolean indicating whether this is a details layer (i.e. usually just one feature).
 * - "selected": a boolean indicating whether the feature is selected.
 * - "highlight": a boolean indicating whether the feature is marked for highlighting.
 * - "superHighlight": a boolean indicating whether the feature is marked for super highlighting.
 * - "options": the current marker options.
 *
 * And it should return the desired marker options. By default, marker options are not customized and just returned as they result from the other customization options.
 * @param {function} [obj.layerOptions.addCustomLayerOptions=null] Function to be used for providing Leaflet with additional layer options when creating the GeoJSON layer. Function accepts one parameter: the current layer options, and should return the desired final layer options to pass to Leaflet. By default, no additional layer options are added and the options are just returned as they result from the other customization options.
 *
 * @return {Layer} The layer object.
 */
export function useLayerObjectWithLegend({legendOptions, layerOptions}) {
    return useLayerObject({...layerOptions, legend: createLayerLegend(legendOptions)});
}
