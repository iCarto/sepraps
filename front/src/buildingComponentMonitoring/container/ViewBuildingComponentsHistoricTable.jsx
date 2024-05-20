import {useEffect, useState} from "react";

import {AlertError} from "base/error/components";
import {Spinner} from "base/shared/components";
import Stack from "@mui/material/Stack";
import {BuildingComponentTable} from "buildingComponentMonitoring/presentational";
import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";
import {SectionBox} from "base/ui/section/components";

const ViewBuildingComponentsHistoricTable = ({buildingComponentId}) => {
    const [buildingComponents, setBuildingComponents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        BuildingComponentMonitoringService.getBuildingComponentHistoric(
            buildingComponentId
        )
            .then(chartData => {
                setBuildingComponents(chartData);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                console.log(error);
            });
    }, [buildingComponentId]);

    return (
        <>
            <AlertError error={error} />
            <Stack alignItems="flex-end" spacing={3}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    buildingComponents.length > 0 && (
                        <SectionBox label="Histórico del componente" sx={{pt: 3}}>
                            <BuildingComponentTable
                                buildingComponents={buildingComponents}
                            />
                        </SectionBox>
                    )
                )}
            </Stack>
        </>
    );
};

export default ViewBuildingComponentsHistoricTable;
