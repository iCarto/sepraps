import {useState} from "react";
import {payment_view_adapter} from "payment/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ProductService} from "product/service";
import {ProductForm} from "product/presentational/form";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import {SectionCard} from "base/ui/section/components";

const CreateProductDataContent = ({paymentId}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("button");
    const [error, setError] = useState(null);

    const handleFormSubmit = payment => {
        ProductService.create(payment_view_adapter({...payment}))
            .then(createdProduct => {
                setMode("button");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const getComponent = mode => {
        if (mode === "button") {
            return (
                <Grid container justifyContent="center">
                    <IconButton
                        aria-label="delete"
                        size="large"
                        color="primary"
                        onClick={() => {
                            setMode("create");
                        }}
                    >
                        <AddIcon fontSize="inherit" />
                    </IconButton>
                </Grid>
            );
        }
        if (mode === "create") {
            return (
                <SectionCard>
                    <ProductForm
                        paymentId={paymentId}
                        onSubmit={handleFormSubmit}
                        onCancel={() => {
                            setMode("view");
                        }}
                        error={error}
                    />
                </SectionCard>
            );
        }
    };

    return getComponent(mode);
};

export default CreateProductDataContent;
