import {
    createPayment,
    createPayments,
    payment_api_adapter,
    payments_api_adapter,
} from "payment/model";
import {createEntityService} from "base/entity/service";

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
};

export default PaymentService;
