import {useEffect} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {useColorMilestone} from "components/milestone/hooks";
import {useMapIcon} from "./hooks/MapIconHook";

const style = {
    width: "100%",
    height: "calc(100vh - 130px)",
};

const MapStats = ({projects}) => {
    const getMilestoneColor = useColorMilestone();
    const getIcon = useMapIcon();

    let map;

    useEffect(() => {
        map = L.map("map", {
            center: [-23.5, -58],
            zoom: 7,
            layers: [
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                }),
            ],
        });

        const markers = [];
        projects.forEach(projectWithStats => {
            const marker = L.marker(
                {
                    lat: projectWithStats.project_latitude,
                    lng: projectWithStats.project_longitude,
                },
                {
                    icon: getIcon(getMilestoneColor(projectWithStats.milestone)),
                    offset: L.point(0, -50),
                }
            ).addTo(map);
            marker.bindTooltip(projectWithStats.project_name);
            marker.on("mouseover", function(e) {
                this.openTooltip();
            });
            marker.on("mouseout", function(e) {
                this.closeTooltip();
            });
            markers.push(marker);
        });

        if (markers.length) {
            map.fitBounds(L.featureGroup(markers).getBounds(), {
                padding: L.point(10, 10),
            });
        }

        return () => {
            map.off();
            map.remove();
        };
    }, [projects]);

    return <div id="map" style={style} />;
};

export default MapStats;
