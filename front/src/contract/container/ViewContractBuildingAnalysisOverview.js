import {useState, useEffect} from "react";
import {ContractService} from "contract/service";

import {ViewBuildingComponentsFinancialData} from "buildingComponent/container";
import {ProjectsBuildingAnalysisSummaryList} from "project/presentational";
import {AlertError} from "base/error/components";
import {Spinner} from "base/shared/components";
import Grid from "@mui/material/Grid";

const ViewContractBuildingAnalysisOverview = ({contractId}) => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        ContractService.getProjectsList(contractId)
            .then(projects => {
                setProjects(projects);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                console.log(error);
                setIsLoading(false);
            });
    }, [contractId]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <ViewBuildingComponentsFinancialData filter={{contract: contractId}} />
            </Grid>

            <Grid item xs={6}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <AlertError error={error} />
                        <ProjectsBuildingAnalysisSummaryList projects={projects} />
                    </>
                )}
            </Grid>
        </Grid>
    );
};

export default ViewContractBuildingAnalysisOverview;
