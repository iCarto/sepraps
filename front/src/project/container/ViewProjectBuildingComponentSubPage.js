import {useEffect, useState} from "react";
import {
    Outlet,
    useLocation,
    useNavigate,
    useOutletContext,
    useParams,
} from "react-router-dom";

import {ProjectService} from "project/service";
import {ContentLayout} from "base/ui/main";
import {AlertError} from "base/error/components";
import {PaperContainer} from "base/shared/components";
import {BuildingComponentListSelector} from "buildingComponent/presentational";

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
    }, [projectId, , location.state?.lastRefreshDate]);

    return (
        <ContentLayout>
            <AlertError error={error} />
            <Grid container>
                <Box sx={{p: 1, width: "calc(100% - 240px)"}}>
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
                                        Este proyecto no tiene ningún componente
                                        todavía.
                                    </Typography>
                                </Grid>
                            </PaperContainer>
                        )}
                </Box>
                <Box sx={{p: 1, width: "240px"}}>
                    <BuildingComponentListSelector
                        buildingComponents={buildingComponentMonitorings}
                        basePath={`/projects/list/${projectId}/buildingcomponent`}
                        selectedBuildingComponentId={parseInt(buildingComponentId)}
                    />
                </Box>
            </Grid>
        </ContentLayout>
    );
};

export default ViewProjectBuildingComponentSubPage;
