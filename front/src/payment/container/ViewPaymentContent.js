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
import {EntityContent} from "base/entity/components/presentational";

import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import {SectionCardHeaderAction} from "base/ui/section/components";

import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigateWithReload} from "base/navigation/hooks";
import {DeleteItemDialog} from "base/delete/components";
import {PaymentStatusChip, getStatusIcon} from "payment/presentational";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import Button from "@mui/material/Button";

const ViewPaymentContent = () => {
    const {contract, payments} = useOutletContext();
    const {paymentId} = useParams();

    const location = useLocation();
    const navigate = useNavigateWithReload();
    const basePath = RouterUtil.getPathForSegment(location, "payment/list");

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [payment, setPayment] = useState(null);

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
