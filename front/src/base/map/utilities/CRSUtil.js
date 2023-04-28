import L from "leaflet";
import "proj4leaflet";
import "leaflet/dist/leaflet.css";

export const crsType = {
    type: "name",
    properties: {
        name: "urn:ogc:def:crs:EPSG::25829",
    },
};

export function useCRS() {
    const crs = new L.Proj.CRS(
        "EPSG:25829",
        "+proj=utm +zone=29 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs", //http://spatialreference.org/ref/epsg/25830/proj4/
        {
            resolutions: [
                1024,
                512,
                256,
                128,
                64,
                32,
                16,
                8,
                4,
                2,
                1,
                0.5,
                0.25,
                0.125,
                0.0625,
                0.03125,
            ],
            //Origen de servicio teselado
            //origin:[0,0]
        }
    );

    return {crs};
}
