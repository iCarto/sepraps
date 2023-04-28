import {useEffect, useState} from "react";
import {StatsService} from "stats/service";
import {useStatsFilter, useStatsView} from "../provider";

import {SubPageLayout} from "base/ui/main";
import {SectionHeading} from "base/section/components";
import {
    StatsByPhaseChart,
    StatsByPhaseTable,
    StatsByPhaseMapView,
    StatsByPhaseFilterForm,
    StatsChangeView,
} from "../presentational";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const ViewStatsByPhaseSubPage = () => {
    const {filterAttributes, setFilterAttributes} = useStatsFilter();
    const {view} = useStatsView();
    const [statsByPhaseData, setStatsByPhaseData] = useState([]);

    useEffect(() => {
        StatsService.getStatsByPhase(filterAttributes).then(result => {
            result.sort((a, b) =>
                a.phase_name > b.phase_name ? 1 : b.phase_name > a.phase_name ? -1 : 0
            );
            setStatsByPhaseData(result);
        });
    }, [filterAttributes]);

    const handleFilterChange = filterAttributes => {
        setFilterAttributes(filterAttributes);
    };

    const handleFilterClear = () => {
        setFilterAttributes({});
    };

    return (
        <SubPageLayout>
            <Paper sx={{p: 3}}>
                <Stack spacing={3}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item xs={12} md={6}>
                            <SectionHeading>
                                Número de proyectos por fase
                            </SectionHeading>
                        </Grid>
                        <Grid item container xs={12} md={6} justifyContent="flex-end">
                            <StatsChangeView />
                        </Grid>
                    </Grid>
                    <StatsByPhaseFilterForm
                        onChange={handleFilterChange}
                        onClear={handleFilterClear}
                    />
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
