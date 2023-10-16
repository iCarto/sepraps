import {useState} from "react";
import {
    SectionActionsMenu,
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
import {DeleteItemDialog} from "base/delete/components";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography/Typography";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

import Stack from "@mui/material/Stack";
import {AccordionLayout} from "base/shared/components";

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
                        <SectionField label="Nombre" value={product.name} />
                    </Grid>
                    <Grid container item xs={6} direction="column">
                        <SectionField label="Estado" value={product.status_label} />
                        <SectionField
                            label="Fecha de presentación"
                            value={DateUtil.formatDate(product.presentation_date)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AccordionLayout
                            accordionTitle="Documentos del producto"
                            accordionIcon={<FolderOutlinedIcon />}
                        >
                            <ListProductFolder
                                folderPath={product.folder}
                                basePath={""}
                            />
                        </AccordionLayout>
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
            <CardHeader
                action={<SectionActionsMenu>{actions}</SectionActionsMenu>}
                title={
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Inventory2OutlinedIcon
                            sx={{
                                color: "grey",
                                fontSize: "18px",
                            }}
                        />
                        <Typography color="grey">Producto:</Typography>
                        <Typography
                            color="primary.dark"
                            sx={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                            }}
                        >
                            {product.name}
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
    );
};

export default ViewOrUpdateProductDataContent;
