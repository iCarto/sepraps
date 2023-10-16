import {useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";

import {ContractService} from "contract/service";
import {ContentLayout} from "base/ui/main";
import {AlertError} from "base/error/components";
import {PaperContainer} from "base/shared/components";
import {PaymentListSelector} from "payment/presentational";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const ViewContractPaymentsSubPage = () => {
    const navigate = useNavigate();
    const {id: contractId, paymentId} = useParams();
    const location = useLocation();
    const isRootPath = location.pathname.split("/").slice(-1)[0] === "payment";

    const [error, setError] = useState(null);

    const [paymentsForContract, setPaymentsForContract] = useState(null);

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

    return (
        <ContentLayout>
            <AlertError error={error} />
            <Grid container>
                <Box sx={{p: 1, width: "calc(100% - 240px)"}}>
                    <Outlet />
                    {isRootPath &&
                        paymentsForContract &&
                        paymentsForContract.length === 0 && (
                            <PaperContainer>
                                <Grid container justifyContent="center" my={6}>
                                    <Typography
                                        sx={{fontStyle: "italic", textAlign: "center"}}
                                    >
                                        No se han registrado pagos para este contrato
                                        todavía
                                    </Typography>
                                </Grid>
                            </PaperContainer>
                        )}
                </Box>
                <Box sx={{p: 1, width: "240px"}}>
                    <PaymentListSelector
                        payments={paymentsForContract}
                        basePath={`/contracts/list/${contractId}/payment`}
                        selectedPaymentId={parseInt(paymentId)}
                    />
                </Box>
            </Grid>
        </ContentLayout>
    );
};

export default ViewContractPaymentsSubPage;
