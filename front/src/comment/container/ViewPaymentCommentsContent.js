import {PaymentService} from "payment/service";

import {CreateCommentDataContent, ViewOrUpdateCommentDataContent} from ".";
import {SectionCard} from "base/ui/section/components";

import Stack from "@mui/system/Stack";

const ViewPaymentCommentsContent = ({payment}) => {
    return (
        payment && (
            <SectionCard title="Gestor de comentarios">
                <Stack spacing={2}>
                    {payment.payment_comments.map(comment => {
                        return (
                            <ViewOrUpdateCommentDataContent
                                key={comment.id}
                                comment={comment}
                            />
                        );
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
