import {useEffect, useMemo, useState} from "react";
import {
    Outlet,
    useLocation,
    useNavigate,
    useOutletContext,
    useParams,
} from "react-router-dom";

import {ContractService} from "contract/service";

import {PaperContainer} from "base/shared/components";
import {TabContainer} from "base/ui/tab/components";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {ContractFinancialDataSummary} from "contract/presentational";
import Box from "@mui/material/Box";
import {RouterUtil} from "base/navigation/utilities";

const ViewContractPaymentsSubPage = () => {
    const {id: contractId} = useParams();

    const location = useLocation();
    const basePath = RouterUtil.getPathForSegment(location, "payment");

    const [contract] = useOutletContext();

    const [error, setError] = useState(null);
    const [paymentsForContract, setPaymentsForContract] = useState(null);

    const contextForOutlet = {contract: contract, payments: paymentsForContract};

    useEffect(() => {
        if (!paymentsForContract) {
            ContractService.getPaymentsList(contractId)
                .then(payments => {
                    setPaymentsForContract(payments);
                })
                .catch(error => {
                    console.log({error});
                    setError(error);
                });
        }
    }, [contractId, location.state?.lastRefreshDate]);

    const tabs = [
        {
            label: "Vista general",
            path: "overview",
            content: <Outlet context={contextForOutlet} />,
        },
        {
            label: "Productos",
            path: "list",
            content: <Outlet context={contextForOutlet} />,
        },
        {
            label: "Análisis",
            path: "analysis",
            content: <Outlet context={contextForOutlet} />,
        },
    ];

    return (
        <Box>
            {!contract.awarding_budget ? (
                <PaperContainer>
                    <Grid container justifyContent="center" my={6}>
                        <Typography
                            sx={{
                                fontStyle: "italic",
                                textAlign: "center",
                            }}
                        >
                            No se pueden gestionar los productos porque el contrato no
                            tiene monto adjudicado todavía
                        </Typography>
                    </Grid>
                </PaperContainer>
            ) : (
                <TabContainer
                    tabs={tabs}
                    error={error}
                    info={<ContractFinancialDataSummary contract={contract} />}
                    basePath={basePath}
                />
            )}
        </Box>
    );
};

export default ViewContractPaymentsSubPage;
