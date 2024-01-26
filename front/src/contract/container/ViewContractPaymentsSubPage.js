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

const ViewContractPaymentsSubPage = () => {
    const navigate = useNavigate();
    const {id: contractId, paymentId, idDocument} = useParams();
    const location = useLocation();
    const isRootPath = location.pathname.split("/").slice(-1)[0] === "payment";

    const [contract] = useOutletContext();
    console.log({contract});

    const [error, setError] = useState(null);
    const [paymentsForContract, setPaymentsForContract] = useState(null);

    const contextForOutlet = {contract: contract, payments: paymentsForContract};

    const defaultPaymentId = useMemo(() => {
        if (paymentId) return paymentId;
        if (paymentsForContract) return paymentsForContract[0]?.id?.toString();
    }, [paymentId, paymentsForContract]);

    useEffect(() => {
        if (!paymentsForContract) {
            ContractService.getPaymentsList(contractId)
                .then(payments => {
                    setPaymentsForContract(payments);
                    if (isRootPath && payments.length > 0) {
                        navigate(payments[0].id.toString());
                    }
                })
                .catch(error => {
                    console.log({error});
                    setError(error);
                });
        }
    }, [contractId]);

    const tabs = [
        {
            label: "Productos",
            path: defaultPaymentId,
            pathsForIndex: [idDocument, "new"],
            content: <Outlet context={contextForOutlet} />,
        },
        {
            label: "Análisis",
            path: "analysis",
            content: <Outlet context={contextForOutlet} />,
        },
    ];

    const filterStartDate = contract.execution_start_date;
    const filterEndDate =
        contract.amended_expected_execution_end_date ||
        contract.expected_execution_end_date;

    return (
        <PaperContainer>
            {!contract.awarding_budget ? (
                <Grid container justifyContent="center" my={6}>
                    <Typography
                        sx={{
                            fontStyle: "italic",
                            textAlign: "center",
                        }}
                    >
                        No se pueden gestionar los productos porque el contrato no tiene
                        monto adjudicado todavía
                    </Typography>
                </Grid>
            ) : (
                <TabContainer tabs={tabs} error={error} />
            )}
        </PaperContainer>
    );
};

export default ViewContractPaymentsSubPage;
