import {useState} from "react";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import {DateUtil} from "base/format/utilities";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {payment_view_adapter} from "payment/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import Grid from "@mui/material/Grid";
import {ProductService} from "product/service";
import {ProductForm} from "product/presentational/form";
import {ListProductFolder} from ".";
import {useMenuGenericDeleteAction} from "base/ui/menu/hooks";
import {DeleteItemDialog} from "base/delete/components";

const ViewPaymentDataContent = ({paymentId, product}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        ProductService.delete(product.id).then(() => {
            navigate("", true);
        });
    };

    const handleFormSubmit = payment => {
        ProductService.update(payment_view_adapter({...payment}))
            .then(updatedProduct => {
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
                        <SectionField label="Estado" value={product.status_label} />
                    </Grid>
                    <Grid container item xs={6} direction="column">
                        <SectionField
                            label="Fecha de presentación"
                            value={DateUtil.formatDate(product.presentation_date)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ListProductFolder folderPath={product.folder} basePath={""} />
                    </Grid>
                </Grid>
            );
        }
        if (mode === "edit") {
            return (
                <ProductForm
                    paymentId={paymentId}
                    product={product}
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
        product && (
            <>
                <DeleteItemDialog
                    isDialogOpen={isDeleteDialogOpen}
                    setIsDialogOpen={setIsDeleteDialogOpen}
                    onDelete={handleDelete}
                />
                <SectionCard title={product.name} secondaryActions={secondaryActions}>
                    {getComponent(mode)}
                </SectionCard>
            </>
        )
    );
};

export default ViewPaymentDataContent;
