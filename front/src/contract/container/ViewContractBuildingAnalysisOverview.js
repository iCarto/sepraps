import {useState, useEffect} from "react";
import {useOutletContext} from "react-router-dom";
import {ContractService} from "contract/service";

import {ViewBuildingComponentsFinancialData} from "buildingComponent/container";
import {ProjectsBuildingAnalysisSummaryList} from "project/presentational";
import {AlertError} from "base/error/components";
import {PaperComponent, Spinner} from "base/shared/components";
import Grid from "@mui/material/Grid";

const ViewContractBuildingAnalysisOverview = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const {contract} = useOutletContext();

    useEffect(() => {
        setIsLoading(true);
        ContractService.getProjectsList(contract.id)
            .then(projects => {
                setProjects(projects);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                console.log(error);
                setIsLoading(false);
            });
    }, [contract.id]);

    return (
        <Grid container spacing={1} alignItems="flex-start">
            <Grid item xs={6}>
                <PaperComponent>
                    <ViewBuildingComponentsFinancialData
                        filter={{contract: contract.id}}
                    />
                </PaperComponent>
            </Grid>

            <Grid item xs={6}>
                <PaperComponent>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <AlertError error={error} />
                            <ProjectsBuildingAnalysisSummaryList projects={projects} />
                        </>
                    )}
                </PaperComponent>
            </Grid>
        </Grid>
    );
};

export default ViewContractBuildingAnalysisOverview;
