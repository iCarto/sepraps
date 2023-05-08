import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {StatsService} from "stats/service";

import {EntityViewSubPage} from "base/entity/pages";
import {SectionCard} from "base/section/components";
import {
    StatsFilterForm,
    StatsByGenderTable,
    StatsByGenderChart,
} from "stats/presentational";

import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const ViewStatsByGenderSubPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({});

    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        StatsService.getStatsByGender(filter).then(data => {
            setData(data);
            setLoading(false);
        });
    }, [filter, location.state?.lastRefreshDate]);

    const handleFilterChange = (attribute, value) => {
        setFilter({...filter, [attribute]: value});
    };

    const handleFilterClear = () => {
        setFilter({});
    };

    const sections = [
        <SectionCard title="Contactos del prestador por género">
            {loading ? (
                <Grid item container justifyContent="center" xs={12}>
                    <CircularProgress color="inherit" size={20} />
                </Grid>
            ) : (
                <>
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
                    <Grid container spacing={10}>
                        <Grid item xs={12} md={6}>
                            <StatsByGenderTable data={data} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <StatsByGenderChart data={data} />
                        </Grid>
                    </Grid>
                </>
            )}
        </SectionCard>,
    ];

    return data && <EntityViewSubPage sections={sections} />;
};

export default ViewStatsByGenderSubPage;
