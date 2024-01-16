import {useState} from "react";

import {PaymentService} from "payment/service";
import {payment_view_adapter} from "payment/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {SectionActionsMenu, SectionCardHeaderAction} from "base/ui/section/components";
import {PaymentData, PaymentStatusChip} from "payment/presentational";
import {PaymentForm} from "payment/presentational/form";
import {DeleteItemDialog} from "base/delete/components";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";

const ViewOrUpdatePaymentDataContent = ({contract, payment}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        PaymentService.delete(payment.id).then(() => {
            navigate(`/contracts/list/${contract.id}/payment`, true);
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
            key="delete"
            name="delete"
            text="Eliminar"
            icon={<DeleteIcon color="error" />}
            onClick={() => {
                setIsDeleteDialogOpen(true);
            }}
        />,
    ];

    const getComponent = mode => {
        if (mode === "view") {
            return <PaymentData payment={payment} />;
        }
        if (mode === "edit") {
            return (
                <PaymentForm
                    contract={contract}
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
                sx={{border: 1, borderColor: "grey.300"}}
                elevation={0}
                component="section"
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
                            <Typography color="grey">Producto:</Typography>
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
                            <PaymentStatusChip
                                label={payment.status_label}
                                value={payment.status}
                            />
                        </Stack>
                    }
                    sx={{bgcolor: "grey.50", borderBottom: "1px solid #ccc"}}
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
