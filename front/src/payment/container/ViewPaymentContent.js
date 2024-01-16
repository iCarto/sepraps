import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {useOutletContext} from "react-router-dom";

import {PaymentService} from "payment/service";
import {RouterUtil} from "base/navigation/utilities";

import {ViewOrUpdatePaymentDataContent} from ".";
import {ViewPaymentProductsContent} from "product/container";
import {ViewPaymentCommentsContent} from "comment/container";
import {ContentLayoutWithAside, SubpageWithSelectorContainer} from "base/ui/main";
import {PaymentListSelector} from "payment/presentational";

const ViewPaymentContent = () => {
    const {contract, payments} = useOutletContext();
    const {id: contractId, paymentId} = useParams();

    const location = useLocation();
    const isRootPath = RouterUtil.getLastUrlSegment(location) === "payment";

    const [payment, setPayment] = useState(null);

    useEffect(() => {
        setPayment(null);
        PaymentService.get(paymentId).then(data => {
            setPayment(data);
        });
    }, [paymentId, location.state?.lastRefreshDate]);

    return (
        <SubpageWithSelectorContainer
            itemsName="productos"
            itemSelector={
                <PaymentListSelector
                    payments={payments}
                    basePath={`/contracts/list/${contractId}/payment`}
                    selectedPaymentId={parseInt(paymentId)}
                />
            }
            noItems={isRootPath && payments && payments.length === 0}
        >
            <ContentLayoutWithAside>
                <ViewOrUpdatePaymentDataContent contract={contract} payment={payment} />
                <ViewPaymentProductsContent payment={payment} />
                <ViewPaymentCommentsContent payment={payment} />
            </ContentLayoutWithAside>
        </SubpageWithSelectorContainer>
    );
};

export default ViewPaymentContent;
