import {useEffect} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {usePhaseColor} from "milestone/hooks";
import {useMapIcon} from "base/map/utilities";

const style = {
    width: "100%",
    height: "calc(100vh - 320px)",
};

const MapStats = ({projects}) => {
    const getPhaseColor = usePhaseColor();
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

        var legend = L.control({position: "bottomleft"});

        const phases = projects.map(project => {
            return {
                phase: project.phase,
                phase_name: project.phase_name,
            };
        });
        const phasesUniq = [
            ...new Map(phases.map(item => [item.phase, item])).values(),
        ];
        legend.onAdd = function(map) {
            var div = L.DomUtil.create("div", "legend");
            div.innerHTML += "<h4>Fases</h4>";
            phasesUniq.forEach(item => {
                div.innerHTML += `<i style="background: ${getPhaseColor(
                    item.phase
                )}"></i><span>${item.phase_name}</span><br>`;
            });
            return div;
        };
        legend.addTo(map);

        const markers = [];
        projects.forEach(project => {
            const marker = L.marker(
                {
                    lat: project.latitude,
                    lng: project.longitude,
                },
                {
                    icon: getIcon(getPhaseColor(project.phase)),
                    offset: L.point(0, -50),
                }
            ).addTo(map);
            marker.bindTooltip(project.locality);
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
