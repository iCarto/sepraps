import {SectionCard} from "base/ui/section/components";
import {CreateProductDataContent, ViewProductDataContent} from ".";
import Stack from "@mui/system/Stack";

const ViewPaymentProductsContent = ({payment}) => {
    return (
        payment && (
            <SectionCard title="Productos del pago">
                <Stack spacing={1}>
                    {payment.payment_products.map(product => {
                        return (
                            <ViewProductDataContent
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
