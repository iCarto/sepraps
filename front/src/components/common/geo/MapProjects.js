import {useEffect} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {useColorMilestone} from "components/milestone/hooks";
import {useMapIcon} from "./hooks/MapIconHook";

const style = {
    width: "100%",
    height: "calc(100vh - 300px)",
};

let map;
let markersGroup;

const MapProjects = ({projects, selectedElement = null, onSelectElement = null}) => {
    const getMilestoneColor = useColorMilestone();
    const getIcon = useMapIcon();

    useEffect(() => {
        console.log("enter useEffect");
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

        return () => {
            map.off();
            map.remove();
        };
    }, [projects]);

    useEffect(() => {
        console.log({markersGroup});
        if (markersGroup) {
            markersGroup.eachLayer(layer => {
                layer.remove();
            });
        }

        const markers = [];
        projects.forEach(project => {
            const marker = L.marker(
                {
                    lat: project.latitude,
                    lng: project.longitude,
                },
                {
                    icon: getIcon(
                        selectedElement?.id === project.id
                            ? null
                            : getMilestoneColor(project.milestone)
                    ),
                    offset: L.point(0, -50),
                }
            ).addTo(map);
            marker.bindTooltip(project.name);
            marker.on("mouseover", function(e) {
                this.openTooltip();
            });
            marker.on("mouseout", function(e) {
                this.closeTooltip();
            });
            marker.on("click", function(e) {
                if (onSelectElement) {
                    onSelectElement(project);
                }
            });
            markers.push(marker);
        });

        if (markers.length) {
            markersGroup = L.featureGroup(markers);
            map.fitBounds(markersGroup.getBounds(), {
                padding: L.point(10, 10),
            });
        }
    }, [selectedElement]);

    return <div id="map" style={style} />;
};

export default MapProjects;
