import {useEffect, useState} from "react";
import {Outlet, useLocation, useOutletContext, useParams} from "react-router-dom";

import {RouterUtil} from "base/navigation/utilities";
import {ContractService} from "contract/service";

import {ContractFinancialDataSummary} from "contract/presentational";
import {PaperContainer} from "base/shared/components";
import {TabContainer} from "base/ui/tab/components";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ViewContractPaymentsSubPage = () => {
    const {id: contractId} = useParams();

    const location = useLocation();
    const basePath = RouterUtil.getPathForSegment(location, "payment");

    const [contract, notifications] = useOutletContext();

    const [error, setError] = useState(null);
    const [paymentsForContract, setPaymentsForContract] = useState(null);
    const [paymentNotifications, setPaymentNotifications] = useState([]);

    const contextForOutlet = {
        contract: contract,
        payments: paymentsForContract,
        paymentNotifications: paymentNotifications,
    };

    useEffect(() => {
        ContractService.getPaymentsList(contractId)
            .then(payments => {
                setPaymentsForContract(payments);
            })
            .catch(error => {
                console.log({error});
                setError(error);
            });
    }, [contractId, location.state?.lastRefreshDate]);

    useEffect(() => {
        if (notifications)
            setPaymentNotifications(
                notifications.filter(item => item.context.section.includes("payments"))
            );
    }, [notifications]);

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
            {!contract.awarding_budget ||
            !contract.execution_start_date ||
            !contract.expected_execution_period ? (
                <PaperContainer>
                    <Grid container justifyContent="center" my={6}>
                        <Typography
                            sx={{
                                fontStyle: "italic",
                                textAlign: "center",
                            }}
                        >
                            No se pueden gestionar los productos porque el contrato no
                            tiene fecha de inicio, plazo previsto de ejecución o monto
                            adjudicado.
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
