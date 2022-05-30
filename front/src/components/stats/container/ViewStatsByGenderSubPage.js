import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {StatsService} from "service/api";
import {SubPageLayout} from "layout";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import {
    StatsFilterForm,
    StatsByGenderTable,
    StatsByGenderChart,
} from "../presentational";

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
                <Typography variant="h5" sx={{mb: 2}}>
                    Contactos del prestador por género
                </Typography>
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
