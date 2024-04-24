import {useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {StatsService} from "stats/service";
import {useStatsView} from "stats/provider";
import {useList} from "base/entity/hooks";

import {EntityViewSubPage} from "base/entity/components/container";
import {EntityCounter} from "base/entity/components/presentational";
import {SectionCard} from "base/ui/section/components";
import {Spinner} from "base/shared/components";
import {
    StatsByPhaseChart,
    StatsByPhaseTable,
    StatsByPhaseMapView,
    StatsChangeView,
    StatsFilterForm,
} from "stats/presentational";
import Grid from "@mui/material/Grid";

const ViewStatsByPhaseSubPage = () => {
    const [statsByPhaseData, setStatsByPhaseData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {filter, setFilter} = useList();

    const {view: selectedView} = useStatsView();
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        StatsService.getStatsByPhase(filter).then(data => {
            data.sort((a, b) =>
                a.phase_name > b.phase_name ? 1 : b.phase_name > a.phase_name ? -1 : 0
            );
            setStatsByPhaseData(data);
            setIsLoading(false);
        });
    }, [filter, location.state?.lastRefreshDate]);

    const handleFilterChange = useCallback(
        attributeValue => {
            setFilter({...filter, ...attributeValue});
        },
        [filter, setFilter]
    );

    const handleFilterClear = () => {
        setFilter(null);
    };

    const getNumberOfProjects = () => {
        let total = 0;
        statsByPhaseData.map(item => (total += item["total"]));
        return total;
    };

    const viewsAndComponents = [
        {
            view: "chart",
            component: (
                <Grid item xs={10} md={6}>
                    <StatsByPhaseChart data={statsByPhaseData} />
                </Grid>
            ),
        },
        {
            view: "table",
            component: <StatsByPhaseTable data={statsByPhaseData} />,
        },
        {
            view: "map",
            component: <StatsByPhaseMapView filter={filter} />,
        },
    ];

    const componentToDisplay = viewsAndComponents.find(
        ({view}) => view === selectedView
    );

    const sections = [
        <SectionCard title="Número de proyectos por fase">
            <Grid
                container
                justifyContent="space-between"
                alignItems="flex-start"
                mb={2}
            >
                <Grid item xs={8}>
                    <StatsFilterForm
                        filter={filter}
                        views={[
                            "financingFunds",
                            "financingPrograms",
                            "contracts",
                            "administrativeDivisions",
                        ]}
                        onChange={handleFilterChange}
                        onClear={handleFilterClear}
                    />
                </Grid>
                <Grid item container xs={2} justifyContent="flex-end">
                    <EntityCounter
                        size={getNumberOfProjects()}
                        entityName={"proyectos"}
                    />
                </Grid>
                <Grid item xs={2} container justifyContent="flex-end">
                    <StatsChangeView />
                </Grid>
            </Grid>
            {isLoading ? (
                <Spinner />
            ) : (
                <Grid container>{componentToDisplay?.component}</Grid>
            )}
        </SectionCard>,
    ];

    return statsByPhaseData && <EntityViewSubPage sections={sections} />;
};

export default ViewStatsByPhaseSubPage;
