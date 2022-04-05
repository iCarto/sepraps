import {useEffect, useState} from "react";
import {StatsService} from "service/api";
import {useStatsFilter, useStatsView} from "../provider";

import {SubPageLayout} from "layout";
import {
    StatsByPhaseChart,
    StatsByPhaseTable,
    StatsByPhaseMapView,
    StatsByPhaseFilter,
    StatsChangeView,
} from "../presentational";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const ViewStatsByPhaseSubPage = () => {
    const {filterAttributes, setFilterAttributes} = useStatsFilter();
    const {view} = useStatsView();
    const [statsByPhaseData, setStatsByPhaseData] = useState([]);

    useEffect(() => {
        StatsService.getStatsByPhase(filterAttributes).then(result => {
            setStatsByPhaseData(result);
        });
    }, [filterAttributes]);

    const handleFilterChange = filterAttributes => {
        setFilterAttributes(filterAttributes);
    };

    return (
        <SubPageLayout>
            <Paper sx={{p: 3}}>
                <Stack spacing={3}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography variant="h5">
                            Número de proyectos por fase
                        </Typography>
                        <StatsChangeView />
                    </Grid>
                    <StatsByPhaseFilter onChange={handleFilterChange} />
                    {view === "chart" && <StatsByPhaseChart data={statsByPhaseData} />}
                    {view === "table" && <StatsByPhaseTable data={statsByPhaseData} />}
                    {view === "map" && (
                        <StatsByPhaseMapView filter={filterAttributes} />
                    )}
                </Stack>
            </Paper>
        </SubPageLayout>
    );
};

export default ViewStatsByPhaseSubPage;
