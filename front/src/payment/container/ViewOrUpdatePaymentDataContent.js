import {useState} from "react";

import {SectionActionsMenu, SectionCardHeaderAction} from "base/ui/section/components";
import {PaymentService} from "payment/service";
import {PaymentData} from "payment/presentational";
import {PaymentForm} from "payment/presentational/form";
import {payment_view_adapter} from "payment/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {DeleteItemDialog} from "base/delete/components";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import {useOutletContext} from "react-router-dom";

const ViewOrUpdatePaymentDataContent = ({contractId, payment}) => {
    const navigate = useNavigateWithReload();
    const [contract] = useOutletContext();

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
                    contractId={contractId}
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
