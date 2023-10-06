import {useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";

import {ContractService} from "contract/service";
import {ContentLayout} from "base/ui/main";
import {AlertError} from "base/error/components";
import {PaperContainer} from "base/shared/components";
import {PaymentList} from "payment/presentational";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ViewContractPaymentsSubPage = () => {
    const navigate = useNavigate();
    const {id: contractId, paymentId} = useParams();
    const location = useLocation();
    const isRootPath = location.pathname.split("/").slice(-1)[0] === "payment";
    console.log(location.pathname.split("/"), {isRootPath});

    const [error, setError] = useState(null);

    const [paymentsForContract, setPaymentsForContract] = useState(null);

    useEffect(() => {
        if (!paymentsForContract) {
            ContractService.getPaymentsList(contractId)
                .then(payments => {
                    setPaymentsForContract(payments);
                    if (isRootPath) {
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
            {paymentsForContract && paymentsForContract.length > 0 ? (
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <Outlet />
                    </Grid>
                    <Grid item xs={2}>
                        <PaymentList
                            payments={paymentsForContract}
                            basePath={`/contracts/list/${contractId}/payment`}
                            selectedPaymentId={parseInt(paymentId)}
                        />
                    </Grid>
                </Grid>
            ) : (
                <PaperContainer>
                    <Grid container justifyContent="center" my={6}>
                        <Typography sx={{fontStyle: "italic", textAlign: "center"}}>
                            No se han registrado pagos para este contrato todavía
                        </Typography>
                    </Grid>
                </PaperContainer>
            )}
        </ContentLayout>
    );
};

export default ViewContractPaymentsSubPage;
