import {useLocation, useNavigate} from "react-router-dom";
import {NumberUtil} from "base/format/utilities";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/section/components";
// import {MapSingleLocation} from "base/component/geo";

import LaunchIcon from "@mui/icons-material/Launch";
import Grid from "@mui/material/Grid";

const EntityLocationSection = ({geom, actions = false}) => {
    const navigate = useNavigate();

    const {pathname} = useLocation();

    const basePath = pathname.split("/summary")[0];

    const sectionActions = [
        <SectionCardHeaderAction
            key="navigate-to-location-subpage"
            name="navigate-to-location-subpage"
            text="Ir a la página de Ubicación"
            icon={<LaunchIcon />}
            onClick={() => {
                navigate(`${basePath}/location`);
            }}
        />,
    ];

    const getCoordinates = geom => {
        if (geom && geom.type === "Point")
            return (
                <Grid container>
                    <Grid item xs={6}>
                        <SectionField
                            label="Coordenadas UTM:"
                            value={`x: ${NumberUtil.formatDecimal(
                                geom.coordinates[0],
                                5
                            )}
                            y: ${NumberUtil.formatDecimal(geom.coordinates[1], 5)}`}
                        />
                    </Grid>
                </Grid>
            );
    };

    return (
        <SectionCard
            title="Ubicación"
            secondaryActions={actions ? sectionActions : null}
        >
            {getCoordinates(geom)}
            {/* {geom && <MapSingleLocation geojson={geom} />} */}
        </SectionCard>
    );
};

export default EntityLocationSection;
