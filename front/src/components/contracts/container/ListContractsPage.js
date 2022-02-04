import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ContractService} from "service/api";
import {useSort, useSearch} from "hooks";
import {SearchBox} from "components/common/presentational";
import {ClosedContractsOption, ContractList} from "../presentational";
import {SortContractsSelect} from "../presentational";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {PageLayout} from "layout";

const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
};

const ListContractsPage = () => {
    const navigate = useNavigate();

    const [contracts, setContracts] = useState([]);
    const [filteredContracts, setFilteredContracts] = useState([]);
    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "updated_at",
        "desc"
    );
    const {searchText, setSearchText, searchFunction} = useSearch("");
    const [showClosedContracts, setShowClosedContracts] = useState(false);

    useEffect(() => {
        ContractService.getContracts(showClosedContracts).then(data => {
            setContracts(data);
            setFilteredContracts([...data].filter(searchFunction).sort(sortFunction));
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
        <PageLayout>
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
            <ContractList contracts={filteredContracts} />
            <Fab
                sx={fabStyle}
                color="primary"
                aria-label="add"
                onClick={() => navigate("/contracts/new")}
            >
                <AddIcon />
            </Fab>
        </PageLayout>
    );
};

export default ListContractsPage;
