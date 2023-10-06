import {
    createProduct,
    createProducts,
    product_api_adapter,
    products_api_adapter,
} from "product/model";
import {createEntityService} from "base/entity/service";

const basePath = "/api/app/products";

const entityService = createEntityService(
    basePath,
    createProduct,
    createProducts,
    product_api_adapter,
    products_api_adapter
);

const ProductService = {
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

export default ProductService;
