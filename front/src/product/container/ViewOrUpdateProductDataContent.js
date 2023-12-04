import {useState} from "react";
import {ProductService} from "product/service";
import {payment_view_adapter} from "payment/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {DateUtil} from "base/format/utilities";
import {
    SectionCardHeaderAction,
    SectionField,
    SubSectionCardHeader,
} from "base/ui/section/components";
import {DeleteItemDialog} from "base/delete/components";
import {ProductForm} from "product/presentational/form";
import {ListProductFolder} from ".";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const ViewOrUpdateProductDataContent = ({paymentId, product}) => {
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
            return (
                <Grid container spacing={2}>
                    <Grid container item xs={6} direction="column">
                        <SectionField label="Estado" value={product.status_label} />
                    </Grid>
                    <Grid container item xs={6} direction="column">
                        <SectionField
                            label="Fecha de entrega"
                            value={DateUtil.formatDate(product.product_date)}
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
        <Card sx={{border: 1, borderRadius: 2, borderColor: "grey.300"}} elevation={0}>
            <SubSectionCardHeader
                titleLabel="Entregable"
                titleValue={product.name}
                icon={<Inventory2OutlinedIcon />}
                actions={actions}
            />
            <CardContent>{getComponent(mode)}</CardContent>
            <DeleteItemDialog
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
                onDelete={handleDelete}
            />
        </Card>
    );
};

export default ViewOrUpdateProductDataContent;
