import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {PaymentService} from "payment/service";
import {ViewOrUpdatePaymentDataContent} from ".";
import {ViewPaymentProductsContent} from "product/container";
import Stack from "@mui/system/Stack";
import {ViewPaymentCommentsContent} from "comment/container";

const ViewPaymentContent = () => {
    const {paymentId} = useParams();
    const [payment, setPayment] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setPayment(null);
        PaymentService.get(paymentId).then(data => {
            setPayment(data);
        });
    }, [paymentId, location.state?.lastRefreshDate]);

    return (
        payment && (
            <Stack spacing={1}>
                <ViewOrUpdatePaymentDataContent
                    contractId={payment.contract}
                    payment={payment}
                />
                <ViewPaymentProductsContent payment={payment} />
                <ViewPaymentCommentsContent payment={payment} />
            </Stack>
        )
    );
};

export default ViewPaymentContent;
