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

    delete payment["payment_products"];
    delete payment["payment_comments"];
    delete payment["expected_total_contract_percentage"];
    delete payment["paid_total_contract_percentage"];
    delete payment["expected_total_amount_cumulative"];
    delete payment["expected_total_contract_percentage_cumulative"];
    delete payment["expected_awarded_contract_percentage_cumulative"];
    delete payment["paid_total_amount_cumulative"];
    delete payment["paid_total_contract_percentage_cumulative"];

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
    expected_fixed_amount = null,
    expected_variable_amount = null,
    expected_total_amount = null,
    expected_approval_date = null,
    paid_fixed_amount = null,
    paid_variable_amount = null,
    paid_total_amount = null,
    status = null,
    status_label = "",
    approval_date = null,
    contract = null,
    folder = "",
    created_by = "",
    created_at = null,
    updated_at = null,
    updated_by = "",
    payment_products = [],
    payment_comments = [],
    contract_total_amount_type = null,
    contract_product_frequency_type = null,
    contract_payment_criteria_type = null,
    expected_total_contract_percentage = null,
    paid_total_contract_percentage = null,
    expected_total_amount_cumulative = null,
    expected_total_contract_percentage_cumulative = null,
    expected_awarded_contract_percentage_cumulative = null,
    paid_total_amount_cumulative = null,
    paid_total_contract_percentage_cumulative = null,
    expected_total_contract_amount = null,
    amended_expected_total_contract_amount = null,
} = {}) => {
    const publicApi = {
        id,
        name,
        expected_fixed_amount,
        expected_variable_amount,
        expected_total_amount,
        expected_approval_date,
        paid_fixed_amount,
        paid_variable_amount,
        paid_total_amount,
        status,
        status_label,
        approval_date,
        contract,
        folder,
        created_by,
        created_at,
        updated_at,
        updated_by,
        payment_products,
        payment_comments,
        contract_total_amount_type,
        contract_product_frequency_type,
        contract_payment_criteria_type,
        expected_total_contract_percentage,
        paid_total_contract_percentage,
        expected_total_amount_cumulative,
        expected_total_contract_percentage_cumulative,
        expected_awarded_contract_percentage_cumulative,
        paid_total_amount_cumulative,
        paid_total_contract_percentage_cumulative,
        expected_total_contract_amount,
        amended_expected_total_contract_amount,
    };

    return Object.freeze(publicApi);
};

export const PRODUCT_STATUS_PAID = "aprobado";
export const PRODUCT_STATUS_REJECTED = "rechazado";
export const PRODUCT_STATUS_PENDING = "pendiente";

export {
    createPayment as default,
    createPayments,
    payment_api_adapter,
    payments_api_adapter,
    payment_view_adapter,
};
