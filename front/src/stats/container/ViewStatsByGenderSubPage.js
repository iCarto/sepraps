import {useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {StatsService} from "stats/service";
import {useList} from "base/entity/hooks";

import {EntityViewSubPage} from "base/entity/components/container";
import {SectionCard} from "base/ui/section/components";
import {Spinner} from "base/shared/components";
import {
    StatsFilterForm,
    StatsByGenderTable,
    StatsByGenderChart,
} from "stats/presentational";

import Grid from "@mui/material/Grid";

const ViewStatsByGenderSubPage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {filter, setFilter} = useList();

    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        StatsService.getStatsByGender(filter).then(data => {
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

    const sections = [
        <SectionCard title="Contactos de prestadores por género">
            <StatsFilterForm
                filter={filter}
                views={[
                    "financingFunds",
                    "financingPrograms",
                    "contracts",
                    "administrativeDivisions",
                    "providers",
                ]}
                onChange={handleFilterChange}
                onClear={handleFilterClear}
            />
            {isLoading ? (
                <Spinner />
            ) : (
                <Grid container columnSpacing={10} mt={3}>
                    <Grid item xs={12} md={6}>
                        <StatsByGenderTable data={data} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StatsByGenderChart data={data} />
                    </Grid>
                </Grid>
            )}
        </SectionCard>,
    ];

    return data ? <EntityViewSubPage sections={sections} /> : null;
};

export default ViewStatsByGenderSubPage;
