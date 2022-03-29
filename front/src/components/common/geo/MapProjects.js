import {useEffect} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {useColorMilestone} from "components/milestone/hooks";
import {useMapIcon} from "./hooks/MapIconHook";

const style = {
    width: "100%",
    height: "calc(100vh - 250px)",
};

const MapProjects = ({projects, selectedElement = null, onSelectElement = null}) => {
    const getMilestoneColor = useColorMilestone();
    const getIcon = useMapIcon();

    let map;

    useEffect(() => {
        map = L.map("map", {
            center: [-23.5, -58],
            zoom: 7,
            layers: [
                L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                }),
            ],
        });

        const markers = [];
        projects.forEach(project => {
            console.log({project});
            const marker = L.marker(
                {
                    lat: project.main_infrastructure.latitude,
                    lng: project.main_infrastructure.longitude,
                },
                {
                    icon: getIcon(getMilestoneColor(project.milestone)),
                    offset: L.point(0, -50),
                }
            ).addTo(map);
            marker.bindTooltip(project.locality.locality_name);
            marker.on("mouseover", function(e) {
                this.openTooltip();
            });
            marker.on("mouseout", function(e) {
                this.closeTooltip();
            });
            marker.on("click", function(e) {
                onSelectElement(project);
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

export default MapProjects;
