import {useState} from "react";
import {payment_view_adapter} from "payment/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ProductService} from "product/service";
import {ProductForm} from "product/presentational/form";
import {AddNewInlineItemButton, AddNewInlineItemFormBox} from "base/shared/components";

const CreateProductDataContent = ({paymentId}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("button");
    const [error, setError] = useState(null);

    const handleFormSubmit = payment => {
        return ProductService.create(payment_view_adapter({...payment}))
            .then(createdProduct => {
                setMode("button");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return mode === "button" ? (
        <AddNewInlineItemButton
            onClick={() => {
                setMode("create");
            }}
            label="Añadir nuevo entregable"
        />
    ) : mode === "create" ? (
        <AddNewInlineItemFormBox label="Añadir nuevo entregable">
            <ProductForm
                paymentId={paymentId}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                    setMode("button");
                }}
                error={error}
            />
        </AddNewInlineItemFormBox>
    ) : null;
};

export default CreateProductDataContent;
