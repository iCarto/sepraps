// import {buildGPX, BaseBuilder} from "gpx-builder";
// import {Point} from "gpx-builder/dist/builder/BaseBuilder/models";
// import {DateUtil, DATE_FORMATS} from "utilities";

// const GpxUtil = {
//     buildGPXFromPoints(points) {
//         const gpxPoints = [];
//         points.forEach(value => {
//             gpxPoints.push(
//                 new Point(value.latitude, value.longitude, {
//                     time: new Date(value.time),
//                     hdop: value.accuracy,
//                 })
//             );
//         });
//         const gpxData = new BaseBuilder();
//         gpxData.setSegmentPoints(gpxPoints);
//         return buildGPX(gpxData.toObject());
//     },

//     getGPXFilename() {
//         return (
//             "GPX_" +
//             DateUtil.formatDateTime(new Date(), DATE_FORMATS.FILE_DATETIMEFORMAT) +
//             ".gpx"
//         );
//     },

//     getDateFromGPXFilename(filename) {
//         return DateUtil.parseDateTime(
//             filename.substring(4, 18),
//             DATE_FORMATS.FILE_DATETIMEFORMAT
//         );
//     },
// };

// export default GpxUtil;
