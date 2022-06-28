import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractService} from "service/api";

import {ContractCard} from "../presentational";
import {SidebarPanel} from "layout";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import LaunchIcon from "@mui/icons-material/Launch";

const ViewContractPanel = () => {
    const navigate = useNavigateWithReload();
    const [contract, setContract] = useState(null);

    const {contractId} = useParams();

    useEffect(() => {
        ContractService.getContract(contractId).then(contract => {
            setContract(contract);
        });
    }, [contractId]);

    const handleCloseSidebar = () => {
        navigate(`/contracts`);
    };

    return (
        <SidebarPanel
            sidebarTitle="Resumen del proyecto"
            closeSidebarClick={handleCloseSidebar}
        >
            {contract && (
                <Grid container direction="column" alignItems="center">
                    <ContractCard contract={contract} />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/contracts/${contract?.id}/summary`)}
                        startIcon={<LaunchIcon />}
                        sx={{mt: 2, width: "fit-content"}}
                    >
                        Ir al contrato
                    </Button>
                </Grid>
            )}
        </SidebarPanel>
    );
};

export default ViewContractPanel;
