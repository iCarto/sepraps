import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {StatsService} from "stats/service";

import {SubPageLayout} from "base/ui/main";
import {SectionHeading} from "base/section/components";
import {
    StatsFilterForm,
    StatsByGenderTable,
    StatsByGenderChart,
} from "../presentational";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const ViewStatsByGenderSubPage = () => {
    const location = useLocation();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({});

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

    return (
        <SubPageLayout>
            <Paper sx={{p: 3}}>
                <SectionHeading>Contactos del prestador por género</SectionHeading>
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
                {loading ? (
                    <Grid item container justifyContent="center" xs={12}>
                        <CircularProgress color="inherit" size={20} />
                    </Grid>
                ) : (
                    <Grid container spacing={10}>
                        <Grid item xs={12} md={6}>
                            <StatsByGenderTable data={data} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <StatsByGenderChart data={data} />
                        </Grid>
                    </Grid>
                )}
            </Paper>
        </SubPageLayout>
    );
};

export default ViewStatsByGenderSubPage;
