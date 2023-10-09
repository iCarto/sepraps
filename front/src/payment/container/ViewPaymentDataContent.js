import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import {PaymentService} from "payment/service";
import {DateUtil, NumberUtil} from "base/format/utilities";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {PaymentForm} from "payment/presentational/form";
import {payment_view_adapter} from "payment/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import Grid from "@mui/material/Grid";
import {DeleteItemDialog} from "base/delete/components";

const ViewPaymentDataContent = ({contractId, payment}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        PaymentService.delete(payment.id).then(() => {
            navigate(`/contracts/list/${contractId}/payment`, true);
        });
    };

    const handleFormSubmit = payment => {
        PaymentService.update(payment_view_adapter({...payment}))
            .then(updatedPayment => {
                setMode("view");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                setMode("edit");
            }}
        />,
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Eliminar"
            icon={<DeleteIcon color="error" />}
            onClick={() => {
                setIsDeleteDialogOpen(true);
            }}
        />,
    ];

    const getComponent = mode => {
        if (mode === "view") {
            return (
                <Grid container spacing={2}>
                    <Grid container item xs={6} direction="column">
                        <SectionField label="Nombre" value={payment.name} />
                        <SectionField
                            label="Monto"
                            value={NumberUtil.formatInteger(payment.amount)}
                            unit="Gs."
                        />
                    </Grid>
                    <Grid container item xs={6} direction="column">
                        <SectionField label="Estado" value={payment.status_label} />
                        <SectionField
                            label="Fecha de pago"
                            value={DateUtil.formatDate(payment.payment_date)}
                        />
                    </Grid>
                </Grid>
            );
        }
        if (mode === "edit") {
            return (
                <PaymentForm
                    contractId={contractId}
                    payment={payment}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                />
            );
        }
    };

    return (
        payment && (
            <>
                <DeleteItemDialog
                    isDialogOpen={isDeleteDialogOpen}
                    setIsDialogOpen={setIsDeleteDialogOpen}
                    onDelete={handleDelete}
                />
                <SectionCard title="Datos del pago" secondaryActions={secondaryActions}>
                    {getComponent(mode)}
                </SectionCard>
            </>
        )
    );
};

export default ViewPaymentDataContent;
