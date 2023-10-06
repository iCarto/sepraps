import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {PaymentService} from "payment/service";
import {ViewPaymentDataContent} from ".";

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
            <ViewPaymentDataContent contractId={payment.contract} payment={payment} />
        )
    );
};

export default ViewPaymentContent;
