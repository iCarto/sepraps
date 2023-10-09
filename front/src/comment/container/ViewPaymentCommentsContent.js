import {SectionCard} from "base/ui/section/components";
import {CreateCommentDataContent, ViewCommentDataContent} from ".";
import Stack from "@mui/system/Stack";
import {PaymentService} from "payment/service";

const ViewPaymentCommentsContent = ({payment}) => {
    return (
        payment && (
            <SectionCard title="Comentarios del pago">
                <Stack spacing={1}>
                    {payment.payment_comments.map(comment => {
                        return <ViewCommentDataContent comment={comment} />;
                    })}
                    <CreateCommentDataContent
                        createService={comment =>
                            PaymentService.createComment(payment.id, comment)
                        }
                    />
                </Stack>
            </SectionCard>
        )
    );
};

export default ViewPaymentCommentsContent;
