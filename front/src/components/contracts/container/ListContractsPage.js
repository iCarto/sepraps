import {useNavigate, useOutletContext} from "react-router-dom";
import {useState, useEffect} from "react";
import {ContractService} from "service/api";

import {useContractListView} from "../provider";
import {PageLayoutWithPanel} from "layout";
import {ContractFilterForm} from "../presentational/form";
import {ContractList, ContractsTable, ContractListChangeView} from "../presentational";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";

const fabStyle = {
    position: "fixed",
    // Leaflet CSS stylesheet is setting map elements' Z-index from 100 to 1000
    zIndex: 1001,
    bottom: 16,
    right: 16,
};

const ListContractsPage = () => {
    const navigate = useNavigate();

    let context;
    [context] = useOutletContext();

    const {
        filter,
        setFilter,
        filterContractsFunction,
        filteredContracts,
        setFilteredContracts,
    } = context;

    const {view} = useContractListView();

    const [contracts, setContracts] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        ContractService.getContracts(false).then(data => {
            setContracts(data);
            setFilteredContracts([...data].filter(filterContractsFunction));
            setLoading(false);
        });
    }, [filter.status]);

    useEffect(() => {
        console.log({filter});
        setFilteredContracts(contracts.filter(filterContractsFunction));
    }, [filter]);

    const handleFilterChange = (attribute, value) => {
        setFilter({...filter, [attribute]: value});
    };

    const handleFilterClear = () => {
        setFilter({});
    };

    const handleClickOnCard = contractId => {
        navigate(`/contracts/${contractId}/summary`);
    };

    const onSelectContract = contract => {
        setSelectedElement(contract);
        navigate(`info/${contract.id}`);
    };

    const getViewComponent = view => {
        if (view === "list") {
            return (
                <ContractList
                    contracts={filteredContracts}
                    onClick={handleClickOnCard}
                />
            );
        }
        return (
            <ContractsTable
                contracts={filteredContracts}
                selectedElement={selectedElement}
                onSelectElement={onSelectContract}
            />
        );
    };

    let noContractsMessage =
        filter.length === 0
            ? "No existen contractos para mostrar"
            : "No se ha encontrado ningún contrato que coincida con su búsqueda. Por favor, intente realizar otra búsqueda o borre los filtros activos.";

    return (
        <PageLayoutWithPanel>
            <Paper sx={{p: 3}}>
                <Grid
                    container
                    sx={{mb: 4}}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item container spacing={2}>
                        <Grid item container xs={8}>
                            <ContractFilterForm
                                filter={filter}
                                filteredNumber={filteredContracts.length}
                                onChange={handleFilterChange}
                                onClear={handleFilterClear}
                            />
                        </Grid>

                        <Grid
                            item
                            container
                            xs={4}
                            alignItems="flex-start"
                            justifyContent="flex-end"
                        >
                            <Stack direction="row" spacing={2}>
                                <Button
                                    id="basic-button"
                                    color="primary"
                                    variant="contained"
                                    sx={{mr: 2, py: 1, lineHeight: 1.25}}
                                    onClick={() => {
                                        navigate("/contracts/new");
                                    }}
                                    startIcon={<AddIcon />}
                                >
                                    Nuevo contrato
                                </Button>
                                <ContractListChangeView />
                            </Stack>
                        </Grid>
                    </Grid>

                    {loading ? (
                        <Grid container justifyContent="center" my={6}>
                            <CircularProgress size={40} />
                        </Grid>
                    ) : filteredContracts.length !== 0 ? (
                        getViewComponent(view)
                    ) : (
                        <Container sx={{textAlign: "center"}}>
                            <Typography py={12} sx={{fontStyle: "italic"}}>
                                {noContractsMessage}
                            </Typography>
                        </Container>
                    )}
                </Grid>
            </Paper>
        </PageLayoutWithPanel>
    );
};
export default ListContractsPage;
