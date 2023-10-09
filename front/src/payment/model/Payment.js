import {comments_api_adapter, createComments} from "comment/model";
import {createProducts, products_api_adapter} from "product/model";

class Payments extends Array {}

const payment_api_adapter = payment => {
    if (payment["payment_products"]) {
        payment["payment_products"] = createProducts(
            products_api_adapter(payment["payment_products"])
        );
    }
    if (payment["payment_comments"]) {
        payment["payment_comments"] = createComments(
            comments_api_adapter(payment["payment_comments"])
        );
    }

    return payment;
};

const payment_view_adapter = payment => {
    delete payment["folder"];
    delete payment["created_by"];
    delete payment["created_at"];
    delete payment["updated_at"];
    delete payment["updated_by"];

    return payment;
};

const payments_api_adapter = payments => {
    return payments.map(payment_api_adapter);
};

const createPayments = (data = []) => {
    const payments = Payments.from(data, payment => createPayment(payment));
    return payments;
};

const createPayment = ({
    id = null,
    name = "",
    amount = null,
    status = "",
    status_label = "",
    payment_date = null,
    folder = "",
    created_by = "",
    created_at = null,
    updated_at = null,
    updated_by = "",
    payment_products = [],
    payment_comments = [],
} = {}) => {
    const publicApi = {
        id,
        name,
        amount,
        status,
        status_label,
        payment_date,
        folder,
        created_by,
        created_at,
        updated_at,
        updated_by,
        payment_products,
        payment_comments,
    };

    return Object.freeze(publicApi);
};

export {
    createPayment as default,
    createPayments,
    payment_api_adapter,
    payments_api_adapter,
    payment_view_adapter,
};
