import {ContractCard} from ".";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const ContractList = ({contracts}) => {
    const noContractFound = contracts.length === 0 || !contracts;

    const contractItems = contracts.map(contract => {
        return (
            <Grid item component="li" key={contract.id} xs={12} sm={6} md={4} xl={2}>
                <ContractCard key={contract.id} contract={contract} />
            </Grid>
        );
    });
    return (
        <Grid
            component="ul"
            container
            spacing={3}
            sx={{display: "flex", justifyContent: "left", p: 0, listStyleType: "none"}}
        >
            {noContractFound ? (
                <Container sx={{mt: 3, textAlign: "center"}}>
                    <Typography variant="h5">
                        Lo sentimos, no se han encontrado contratos que coincidan con su
                        búsqueda.
                    </Typography>
                    <Typography variant="h5">
                        Introduzca otro texto para buscar de nuevo.
                    </Typography>
                </Container>
            ) : (
                contractItems
            )}
        </Grid>
    );
};

export default ContractList;
