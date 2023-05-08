import {useEffect, useState} from "react";
import {StatsService} from "stats/service";
import {useStatsFilter, useStatsView} from "stats/provider";

import {EntityViewSubPage} from "base/entity/pages";
import {SectionCard} from "base/section/components";
import {
    StatsByPhaseChart,
    StatsByPhaseTable,
    StatsByPhaseMapView,
    StatsByPhaseFilterForm,
    StatsChangeView,
} from "stats/presentational";

import Grid from "@mui/material/Grid";

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

    const sections = [
        <>
            <SectionCard title="Número de proyectos por fase">
                <Grid container justifyContent="space-between" alignItems="flex-start">
                    <Grid item xs={6}>
                        <StatsByPhaseFilterForm
                            onChange={handleFilterChange}
                            onClear={handleFilterClear}
                        />
                    </Grid>
                    <Grid item xs={6} container justifyContent="flex-end">
                        <StatsChangeView />
                    </Grid>
                </Grid>
                {view === "chart" && <StatsByPhaseChart data={statsByPhaseData} />}
                {view === "table" && <StatsByPhaseTable data={statsByPhaseData} />}
                {view === "map" && <StatsByPhaseMapView filter={filterAttributes} />}
            </SectionCard>
        </>,
    ];

    return statsByPhaseData && <EntityViewSubPage sections={sections} />;
};

export default ViewStatsByPhaseSubPage;
