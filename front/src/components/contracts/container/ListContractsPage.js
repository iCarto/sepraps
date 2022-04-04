import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSort, useSearch} from "hooks";
import {ContractService} from "service/api";

import {PageLayout} from "layout";
import {SearchBox} from "components/common/presentational";
import {
    ClosedContractsOption,
    ContractList,
    SortContractsSelect,
} from "../presentational";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {PageLayoutWithPanel} from "layout";

const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
};

const ListContractsPage = () => {
    const navigate = useNavigate();

    const [contracts, setContracts] = useState([]);
    const [filteredContracts, setFilteredContracts] = useState([]);
    const [loading, setLoading] = useState(false);
    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "updated_at",
        "desc"
    );
    const {searchText, setSearchText, searchFunction} = useSearch("");
    const [showClosedContracts, setShowClosedContracts] = useState(false);

    useEffect(() => {
        setLoading(true);
        ContractService.getContracts(showClosedContracts).then(data => {
            setContracts(data);
            setFilteredContracts([...data].filter(searchFunction).sort(sortFunction));
            setLoading(false);
        });
    }, [showClosedContracts]);

    useEffect(() => {
        setFilteredContracts([...contracts].filter(searchFunction).sort(sortFunction));
    }, [attribute, order, searchText]);

    const handleSearch = data => {
        setSearchText(data);
    };

    const handleSortBy = (attribute, order) => {
        setAttribute(attribute);
        setOrder(order);
    };

    const handleClosedContracts = showClosed => {
        setShowClosedContracts(showClosed);
    };

    return (
        <PageLayoutWithPanel>
            <Paper sx={{p: 3}}>
                <Grid
                    container
                    sx={{mb: 4}}
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item md={6}>
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={6}>
                                <SearchBox
                                    searchValue={searchText}
                                    handleSearch={handleSearch}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <ClosedContractsOption
                                    checked={showClosedContracts}
                                    handleChange={handleClosedContracts}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={2}></Grid>
                    <Grid item md={3}>
                        <SortContractsSelect
                            attribute={attribute}
                            order={order}
                            handleSortBy={handleSortBy}
                        />
                    </Grid>
                </Grid>
                <Grid item md={2}></Grid>
                <Grid item md={3}>
                    <SortContractsSelect
                        attribute={attribute}
                        order={order}
                        handleSortBy={handleSortBy}
                    />
                </Grid>
            {loading ? (
                <Grid container justifyContent="center" my={6} xs={12}>
                    <CircularProgress size={40} />
                </Grid>
            ) : (
                <ContractList contracts={filteredContracts} />
            )}
            </Paper>

            <Fab
                sx={fabStyle}
                color="primary"
                aria-label="add"
                onClick={() => navigate("/contracts/new")}
            >
                <AddIcon />
            </Fab>
        </PageLayoutWithPanel>
    );
};

export default ListContractsPage;
