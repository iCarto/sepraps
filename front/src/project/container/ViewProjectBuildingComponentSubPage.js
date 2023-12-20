import {useEffect, useState} from "react";
import {
    Outlet,
    useLocation,
    useNavigate,
    useOutletContext,
    useParams,
} from "react-router-dom";

import {SELECTOR_RIGHT_PANEL_WIDTH} from "base/ui/app/config/measurements";
import {ProjectService} from "project/service";
import {AlertError} from "base/error/components";
import {PaperContainer} from "base/shared/components";
import {ComponentListSelector} from "component/presentational";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ViewProjectBuildingComponentSubPage = () => {
    const navigate = useNavigate();
    const {id: projectId, buildingComponentId} = useParams();
    const location = useLocation();
    const isRootPath =
        location.pathname.split("/").slice(-1)[0] === "buildingcomponent";

    const [project] = useOutletContext();

    const [error, setError] = useState(null);
    const [buildingComponentMonitorings, setBuildingComponentMonitorings] = useState(
        null
    );

    useEffect(() => {
        ProjectService.getProjectBuildingComponents(projectId)
            .then(items => {
                setBuildingComponentMonitorings(items);
                if (isRootPath && items.length > 0) {
                    navigate(items[0].id.toString());
                }
            })
            .catch(error => {
                console.log({error});
                setError(error);
            });
    }, [projectId, location.state?.lastRefreshDate]);

    return (
        <Grid container role="subpage-content-container">
            <AlertError error={error} />
            <Box sx={{width: `calc(100% - ${SELECTOR_RIGHT_PANEL_WIDTH}px)`}}>
                <Outlet context={[project]} />
                {isRootPath &&
                    buildingComponentMonitorings &&
                    buildingComponentMonitorings.length === 0 && (
                        <PaperContainer>
                            <Grid container justifyContent="center" my={6}>
                                <Typography
                                    sx={{
                                        fontStyle: "italic",
                                        textAlign: "center",
                                    }}
                                >
                                    Este proyecto no tiene ningún componente todavía.
                                </Typography>
                            </Grid>
                        </PaperContainer>
                    )}
            </Box>
            <Box
                component="aside"
                sx={{pl: 1, width: `${SELECTOR_RIGHT_PANEL_WIDTH}px`}}
            >
                <ComponentListSelector
                    components={buildingComponentMonitorings}
                    basePath={`/projects/list/${projectId}/buildingcomponent`}
                    selectedComponentId={parseInt(buildingComponentId)}
                />
            </Box>
        </Grid>
    );
};

export default ViewProjectBuildingComponentSubPage;
