import {useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {StatsService} from "stats/service";
import {StatsFilterProvider} from "stats/provider";

import {EntityViewSubPage} from "base/entity/components/container";
import {SectionCard} from "base/ui/section/components";
import {Spinner} from "base/shared/components";
import {
    StatsFilterForm,
    StatsByGenderTable,
    StatsByGenderPieChart,
} from "stats/presentational";
import {EntityNoItemsComponent} from "base/entity/components/presentational";
import Grid from "@mui/material/Grid";

const ViewStatsByGenderSubPage = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        StatsService.getStatsByGender(filter).then(data => {
            console.log({data});
            setData(data);
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
        setFilter({});
    };

    const totalData = data?.find(item => item.gender === "TOTAL");
    const noElements = !totalData?.total;
    const isFilterEmpty = filter ? Object.values(filter).every(value => !value) : true;

    const sections = [
        <SectionCard title="Miembros de las Comisiones Directivas por género">
            <StatsFilterForm
                filter={filter}
                views={["administrativeDivisions", "providerType"]}
                onChange={handleFilterChange}
                onClear={handleFilterClear}
            />
            {isLoading ? (
                <Spinner />
            ) : noElements ? (
                <EntityNoItemsComponent isFilterEmpty={isFilterEmpty} />
            ) : (
                <Grid container columnSpacing={10} mt={3}>
                    <Grid item xs={12} md={5} xl={3}>
                        <StatsByGenderPieChart data={data} />
                    </Grid>
                    <Grid item xs={12} md={6} xl={4}>
                        <StatsByGenderTable data={data} />
                    </Grid>
                </Grid>
            )}
        </SectionCard>,
    ];

    return (
        <StatsFilterProvider>
            <EntityViewSubPage sections={sections} />
        </StatsFilterProvider>
    );
};

export default ViewStatsByGenderSubPage;
