import L from "leaflet";
import SquareIcon from "@mui/icons-material/Square";
import CircleIcon from "@mui/icons-material/Circle";
import HexagonIcon from "@mui/icons-material/Hexagon";
import PentagonIcon from "@mui/icons-material/Pentagon";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {LegendLineIcon} from "..";

// See https://github.com/rizac/leaflet-poly-marker
// (c) R. Zaccarelli (rizac@github.com)
const LPolyMarker = L.Polygon.extend({
    // PolyMarker options
    options: {
        // The marker symbol. Defaults to 's' (square)
        marker: "s",
        // @option radius: Number = 10, in pixels. Radius of the circle circumscribing
        // the polygon, basically the smallest circle enclosing the whole polygon
        radius: 10,
    },

    markers: {
        // defined in the __proto__ (so shared across instances and not created each time). Same for options above
        s: [45, 4],
        d: [0, 4],
        D: [0, 4],
        p: [18, 5],
        h: [30, 6],
        H: [0, 6],
        "^": [-30, 3],
        v: [-90, 3],
        "<": [60, 3],
        ">": [0, 3],
        "8": [22.5, 8],
    },

    initialize: function(latlng, ...initOptions) {
        if (initOptions.length === 2) {
            var [marker, options] = initOptions;
            options.marker = marker;
        } else {
            options = initOptions[0];
        }
        L.Util.setOptions(this, options); // merge options defined in __proto__ with this instance options
        L.Polygon.prototype.initialize.call(this, [], options);
        if (Array.isArray(latlng)) {
            latlng = L.latLng(latlng[0], latlng[1]);
        }
        this._latlng = latlng;
    },

    onRemove: function() {
        delete this._mapZoom;
        L.Polygon.prototype.onRemove.call(this);
    },

    getCenter: function() {
        // Overrides getCenter as we do not need to calculate it here
        return this._latlng;
    },

    _project: function() {
        // This is called when map is zoomed ('zoomend'). See Renderer._onZoomEnd
        if (this._map && this._map.getZoom() !== this._mapZoom) {
            this._mapZoom = this._map.getZoom();
            this._setLatLngs(this.computeLatLngs(this._map));
        }
        L.Polygon.prototype._project.call(this);
    },

    computeLatLngs: function(map) {
        // Note: All Leaflet methods that accept LatLng objects also accept them in a simple
        // Array form and simple object form (unless noted otherwise)
        var marker = this.options.marker;
        let startAngle, numSides;
        if (marker in this.markers) {
            [startAngle, numSides] = this.markers[marker];
        } else if (parseInt(marker) === marker) {
            // marker is int or int-string, e.g. 15, '28'?
            [startAngle, numSides] = [0, parseInt(marker)];
        } else {
            return []; // Array of zero points
        }
        var [PI, cos, sin, abs] = [Math.PI, Math.cos, Math.sin, Math.abs];
        startAngle = (PI * startAngle) / 180.0; // convert to radians
        var stepAngle = (2 * PI) / numSides; // in radians
        var angles = new Array(numSides)
            .fill(0)
            .map((element, index) => index * stepAngle + startAngle);
        var latLng = this._latlng;
        var center = map.latLngToLayerPoint(latLng); // center of shape in Pt units
        var radius = this.options.radius;
        var latlngs = angles.map(function(angle, index) {
            var [x, y] = [radius * cos(angle), radius * sin(angle)];
            return map.layerPointToLatLng(new L.Point(center.x + x, center.y - y));
        });
        // post process for specific markers:
        if (marker === "d") {
            // thin diamond, shrink horizontal side
            var w = abs(latlngs[0].lng - latlngs[2].lng) / 4.0;
            latlngs[0].lng -= w;
            latlngs[2].lng += w;
        }
        return latlngs;
    },

    // Additional function for allowing styles to be changed on the fly
    setStyle: function(style) {
        L.Polygon.prototype.setStyle.call(this, style);
        if (this._map) {
            this._setLatLngs(this.computeLatLngs(this._map));
            L.Polygon.prototype.redraw.call(this);
        }
    },
});

// factory function (https://leafletjs.com/examples/extending/extending-1-classes.html#factories)
export function getLeafletPolyMarker(latlng, ...options) {
    if (options.length === 2 && options[0] === "c") {
        return new L.CircleMarker(latlng, options[1]);
    } else if (options.length === 1 && options[0] && options[0].marker === "c") {
        return new L.CircleMarker(latlng, options[0]);
    }
    return new LPolyMarker(latlng, ...options);
}

export function getMuiIcon({
    marker,
    color = null,
    fillColor = null,
    fillOpacity = 1,
    fontSize = 24,
    radius = null,
    addStroke = true,
    strokeColor = "white",
    strokeWidth = 2,
    dashArray = "",
    customSx = {},
}) {
    if (fillColor !== null || color !== null) {
        customSx["color"] = fillColor || color;
    }
    if (fillOpacity !== 1) {
        customSx["fillOpacity"] = fillOpacity;
    }
    if (dashArray) {
        customSx["dashed"] = true;
    }
    if (radius !== null && !Number.isNaN(radius)) {
        switch (marker) {
            case "s":
            case "d":
                fontSize = radius * 1.8;
                break;
            case ">":
            case "<":
            case "^":
            case "v":
                fontSize = radius * 2.8;
                break;
            default:
                fontSize = radius * 2.3;
        }
    }
    if (fontSize !== null && !Number.isNaN(fontSize)) {
        customSx["fontSize"] = fontSize + "px";
    }
    if (addStroke) {
        customSx["stroke"] = strokeColor;
        customSx["strokeWidth"] = strokeWidth;
    }
    switch (marker) {
        case "s":
            return <SquareIcon sx={{...customSx}} />;
        case "D":
            return (
                <SquareIcon
                    sx={{...customSx, transform: "rotate(45deg) scale(0.75)"}}
                />
            );
        case "d":
            return (
                <SquareIcon
                    sx={{
                        ...customSx,
                        transform: "rotate(45deg) skew(15deg,15deg) scale(0.75)",
                    }}
                />
            );
        case ">":
            return <PlayArrowIcon sx={{...customSx}} />;
        case "<":
            return <PlayArrowIcon sx={{...customSx, transform: "rotate(180deg)"}} />;
        case "^":
            return <PlayArrowIcon sx={{...customSx, transform: "rotate(-90deg)"}} />;
        case "v":
            return <PlayArrowIcon sx={{...customSx, transform: "rotate(90deg)"}} />;
        case "h":
            return <HexagonIcon sx={{...customSx, transform: "rotate(-90deg)"}} />;
        case "H":
            return <HexagonIcon sx={{...customSx}} />;
        case "p":
            return <PentagonIcon sx={{...customSx}} />;
        case "8":
            return <PentagonIcon sx={{...customSx}} />;
        case "l":
            return (
                <LegendLineIcon color={customSx["color"]} dashed={customSx["dashed"]} />
            );
        default:
            return <CircleIcon sx={{...customSx}} />;
    }
}
