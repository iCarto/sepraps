import {ContractCard} from ".";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ContractList = ({contracts, onClick}) => {
    const noContractFound = contracts.length === 0 || !contracts;

    const contractItems = contracts.map(contract => {
        return (
            <Grid item component="li" xs={12} sm={6} md={3} xl={3} key={contract.id}>
                <ContractCard key={contract.id} contract={contract} onClick={onClick} />
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
                <Container sx={{mt: 3, textAlign: "center"}}></Container>
            ) : (
                contractItems
            )}
        </Grid>
    );
};

export default ContractList;
