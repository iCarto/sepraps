import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {useOutletContext} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {RouterUtil} from "base/navigation/utilities";
import {PaymentService} from "payment/service";

import {ViewOrUpdatePaymentDataContent, ViewPaymentCertificationsContent} from ".";
import {ViewPaymentProductsContent} from "product/container";
import {ViewPaymentCommentsContent} from "comment/container";
import {ContentLayoutWithAside, SubpageWithSelectorContainer} from "base/ui/main";
import {ListSelector} from "base/shared/components";
import {EntityContent} from "base/entity/components/presentational";
import {SectionCardHeaderAction} from "base/ui/section/components";
import {DeleteItemDialog} from "base/delete/components";
import {PaymentSelectorItem, PaymentStatusChip} from "payment/presentational";
import {EntityAuditSection} from "base/entity/components/presentational/sections";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";

const ViewPaymentContent = () => {
    const {contract, payments, paymentNotifications} = useOutletContext();
    const {paymentId} = useParams();

    const location = useLocation();
    const navigate = useNavigateWithReload();
    const basePath = RouterUtil.getPathForSegment(location, "payment/list");

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [payment, setPayment] = useState(null);

    const paymentIdsWithNotifications = paymentNotifications.map(
        item => item.context.payment_id
    );
    // TO-DO(cmartin): change when other types of notifications are available for payments.
    const inconsistentCertificationsTotal = paymentIdsWithNotifications.includes(
        payment?.id
    );

    useEffect(() => {
        setPayment(null);
        if (paymentId) {
            PaymentService.get(paymentId).then(data => {
                setPayment(data);
            });
        } else if (payments?.length > 0) {
            navigate(payments[0].id.toString());
        }
    }, [paymentId, location.state?.lastRefreshDate]);

    const handleDelete = () => {
        PaymentService.delete(payment.id).then(() => {
            navigate(basePath, true);
        });
    };

    const actions = [
        <SectionCardHeaderAction
            key="delete"
            name="delete"
            text="Eliminar"
            icon={<DeleteIcon color="error" />}
            onClick={() => {
                setIsDeleteDialogOpen(true);
            }}
        />,
    ];

    return (
        <SubpageWithSelectorContainer
            itemsName="productos"
            itemSelector={
                <ListSelector
                    title="Productos"
                    items={payments}
                    renderItem={payment => {
                        return (
                            <PaymentSelectorItem
                                payment={payment}
                                currentPaymentId={paymentId}
                                basePath={basePath}
                                paymentIdsWithNotifications={
                                    paymentIdsWithNotifications
                                }
                            />
                        );
                    }}
                    basePath={basePath}
                />
            }
            noItems={payments?.length === 0}
            newItems={
                <Button
                    variant="outlined"
                    onClick={() => {
                        navigate("wizard");
                    }}
                >
                    Añadir productos
                </Button>
            }
        >
            <ContentLayoutWithAside>
                {payment && (
                    <EntityContent
                        entityLabel="Producto"
                        entityName={payment.name}
                        entityIcon={<RequestQuoteOutlinedIcon />}
                        chip={
                            <PaymentStatusChip
                                label={payment.status_label}
                                value={payment.status}
                            />
                        }
                        actions={actions}
                    >
                        <ViewOrUpdatePaymentDataContent
                            contract={contract}
                            payment={payment}
                        />
                        {payment?.certifications?.length ? (
                            <ViewPaymentCertificationsContent
                                payment={payment}
                                inconsistentTotalAmount={
                                    inconsistentCertificationsTotal
                                }
                            />
                        ) : null}
                        <ViewPaymentProductsContent payment={payment} />
                        <ViewPaymentCommentsContent payment={payment} />
                        <EntityAuditSection entity={payment} />
                        <DeleteItemDialog
                            isDialogOpen={isDeleteDialogOpen}
                            setIsDialogOpen={setIsDeleteDialogOpen}
                            onDelete={handleDelete}
                        />
                    </EntityContent>
                )}
            </ContentLayoutWithAside>
        </SubpageWithSelectorContainer>
    );
};

export default ViewPaymentContent;
