import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {useOutletContext} from "react-router-dom";

import {PaymentService} from "payment/service";
import {RouterUtil} from "base/navigation/utilities";

import {ViewOrUpdatePaymentDataContent} from ".";
import {ViewPaymentProductsContent} from "product/container";
import {ViewPaymentCommentsContent} from "comment/container";
import {ContentLayoutWithAside, SubpageWithSelectorContainer} from "base/ui/main";
import {ListSelector, ListSelectorItem} from "base/shared/components";
import {DateUtil} from "base/format/utilities";
import {getStatusIcon} from "payment/presentational/PaymentStatusChip";

const ViewPaymentContent = () => {
    const {contract, payments} = useOutletContext();
    const {paymentId} = useParams();

    console.log({paymentId});

    const location = useLocation();
    const isRootPath = RouterUtil.getLastUrlSegment(location) === "payment";
    const basePath = location.pathname.split("/payment")[0] + "/payment";

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
                <ListSelector
                    title="Productos"
                    items={payments}
                    renderItem={payment => (
                        <ListSelectorItem
                            key={payment.id}
                            heading={payment.name}
                            subHeading={
                                payment.approval_date || payment.expected_approval_date
                                    ? `(${DateUtil.formatDate(
                                          payment.approval_date
                                              ? payment.approval_date
                                              : payment.expected_approval_date
                                      )})`
                                    : "-"
                            }
                            icon={getStatusIcon(payment.status)}
                            to={`${basePath}/${payment.id}`}
                            selected={parseInt(paymentId) === payment.id}
                        />
                    )}
                    basePath={basePath}
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
