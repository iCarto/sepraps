import {useState} from "react";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/ui/section/components";
import {DateUtil} from "base/format/utilities";
import EditIcon from "@mui/icons-material/Edit";
import {payment_view_adapter} from "payment/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import Grid from "@mui/material/Grid";
import {ProductService} from "product/service";
import {ProductForm} from "product/presentational/form";
import {ListFolder} from "base/file/components";
import {FolderViewProvider} from "base/file/provider";
import {ListProductFolder} from ".";

const ViewPaymentDataContent = ({paymentId, product}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

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
    ];

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
            <SectionCard title={product.name} secondaryActions={secondaryActions}>
                {getComponent(mode)}
            </SectionCard>
        )
    );
};

export default ViewPaymentDataContent;
