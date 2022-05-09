import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigateWithReload} from "hooks";
import {ContractService} from "service/api";

import {ContractCard} from "../presentational";
import {SidebarPanel} from "layout";

import LaunchIcon from "@mui/icons-material/Launch";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

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
                <Grid container justifyContent="center">
                    <ContractCard contract={contract} />
                    <Grid sx={{mt: 2}}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ml: 3}}
                            onClick={() => navigate(`/contracts/${contract?.id}`)}
                            startIcon={<LaunchIcon />}
                        >
                            Ir al contrato
                        </Button>
                    </Grid>
                </Grid>
            )}
        </SidebarPanel>
    );
};

export default ViewContractPanel;
