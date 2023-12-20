import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {PaymentService} from "payment/service";
import {ViewOrUpdatePaymentDataContent} from ".";
import {ViewPaymentProductsContent} from "product/container";
import {ViewPaymentCommentsContent} from "comment/container";
import {ContentLayoutWithAside} from "base/ui/main";

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
            <ContentLayoutWithAside>
                <ViewOrUpdatePaymentDataContent
                    contractId={payment.contract}
                    payment={payment}
                />
                <ViewPaymentProductsContent payment={payment} />
                <ViewPaymentCommentsContent payment={payment} />
            </ContentLayoutWithAside>
        )
    );
};

export default ViewPaymentContent;
