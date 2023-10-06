class Products extends Array {}

const product_api_adapter = fieldReport => {
    return fieldReport;
};

const product_view_adapter = product => {
    delete product["folder"];
    delete product["created_by"];
    delete product["created_at"];
    delete product["updated_at"];
    delete product["updated_by"];

    return product;
};

const products_api_adapter = products => {
    return products.map(product_api_adapter);
};

const createProducts = (data = []) => {
    const products = Products.from(data, product => createProduct(product));
    return products;
};

const createProduct = ({
    id = null,
    name = "",
    status = "",
    status_label = "",
    presentation_date = null,
    folder = "",
    created_by = "",
    created_at = null,
    updated_at = null,
    updated_by = "",
} = {}) => {
    const publicApi = {
        id,
        name,
        status,
        status_label,
        presentation_date,
        folder,
        created_by,
        created_at,
        updated_at,
        updated_by,
    };

    return Object.freeze(publicApi);
};

export {
    createProduct as default,
    createProducts,
    product_api_adapter,
    products_api_adapter,
    product_view_adapter,
};
