import {SectionCard} from "base/ui/section/components";
import {CreateProductDataContent, ViewOrUpdateProductDataContent} from ".";
import Stack from "@mui/system/Stack";

const ViewPaymentProductsContent = ({payment}) => {
    return (
        payment && (
            <SectionCard title="Entregables">
                <Stack spacing={2}>
                    {payment.payment_products.map(product => {
                        return (
                            <ViewOrUpdateProductDataContent
                                key={product.id}
                                paymentId={payment.id}
                                product={product}
                            />
                        );
                    })}
                    <CreateProductDataContent paymentId={payment.id} />
                </Stack>
            </SectionCard>
        )
    );
};

export default ViewPaymentProductsContent;
