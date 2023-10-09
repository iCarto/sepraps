import {
    createPayment,
    createPayments,
    payment_api_adapter,
    payments_api_adapter,
} from "payment/model";
import {createEntityService} from "base/entity/service";
import {AuthApiService} from "base/api/service";
import {comment_api_adapter, createComment} from "comment/model";

const basePath = "/api/app/payments";

const entityService = createEntityService(
    basePath,
    createPayment,
    createPayments,
    payment_api_adapter,
    payments_api_adapter
);

const PaymentService = {
    get(id) {
        return entityService.get(id).then(data => {
            return data;
        });
    },

    create(entity) {
        return entityService.create(entity);
    },

    update(entity) {
        return entityService.update(entity);
    },

    delete(id) {
        return entityService.delete(id);
    },

    createComment(paymentId, comment) {
        return AuthApiService.post(`${basePath}/${paymentId}/comments`, comment).then(
            response => {
                return createComment(comment_api_adapter(response));
            }
        );
    },
};

export default PaymentService;
