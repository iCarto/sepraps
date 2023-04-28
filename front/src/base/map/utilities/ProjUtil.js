import proj4 from "proj4";

proj4.defs(
    "EPSG:25829",
    "+proj=utm +zone=29 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
);

const ProjUtil = {
    transformTo4326(x, y) {
        if (x && y) {
            const result = proj4("EPSG:25829", "EPSG:4326", [x, y]);
            return {lat: result[1], lon: result[0]};
        }
        return null;
    },

    transformFrom4326(latitude, longitude) {
        console.log({latitude}, {longitude});
        if (latitude && longitude) {
            const result = proj4("EPSG:4326", "EPSG:25829", [longitude, latitude]);
            return {x: result[0], y: result[1]};
        }
        return null;
    },
};

export default ProjUtil;
