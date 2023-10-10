import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {
    SectionActionsMenu,
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
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";

import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";

const getStatusColor = value => {
    if (value === "no_pagado") {
        return "error";
    } else if (value === "pagado") {
        return "success";
    }
    return null;
};

const StatusChip = ({label, value}) => (
    <Chip label={label} color={getStatusColor(value)} />
);

const ViewOrUpdatePaymentDataContent = ({contractId, payment}) => {
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

    const actions = [
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
                        <SectionField
                            label="Estado"
                            value={
                                <StatusChip
                                    label={payment.status_label}
                                    value={payment.status}
                                />
                            }
                        />
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
            <Card
                sx={{border: 1, borderRadius: 2, borderColor: "grey.300"}}
                elevation={0}
            >
                <CardHeader
                    action={<SectionActionsMenu>{actions}</SectionActionsMenu>}
                    title={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <RequestQuoteOutlinedIcon
                                sx={{
                                    color: "grey",
                                }}
                            />
                            <Typography color="grey">Pago:</Typography>
                            <Typography
                                color="primary.main"
                                sx={{
                                    textTransform: "uppercase",
                                    fontWeight: "bold",
                                }}
                                variant="h5"
                            >
                                {payment.name}
                            </Typography>
                        </Stack>
                    }
                    sx={{bgcolor: "grey.50"}}
                />
                <CardContent>{getComponent(mode)}</CardContent>
                <DeleteItemDialog
                    isDialogOpen={isDeleteDialogOpen}
                    setIsDialogOpen={setIsDeleteDialogOpen}
                    onDelete={handleDelete}
                />
            </Card>
        )
    );
};

export default ViewOrUpdatePaymentDataContent;
