import {AuthApiService} from "base/api/service";
import {ServiceRequestFormat, ServiceUtil} from "base/api/utilities";

class EntityService {
    #base_path;
    #object_constructor;
    #objects_constructor;
    #object_api_adapter;
    #objects_api_adapter;

    constructor(
        base_path,
        object_constructor = null,
        objects_constructor = null,
        object_api_adapter = null,
        objects_api_adapter = null
    ) {
        this.#base_path = base_path;
        this.#object_constructor = object_constructor;
        this.#objects_constructor = objects_constructor;
        this.#object_api_adapter = object_api_adapter;
        this.#objects_api_adapter = objects_api_adapter;
    }

    getList(filter, page, sort, order, format = null) {
        return AuthApiService.get(
            `${this.#base_path}?${ServiceUtil.getQueryString(
                page,
                filter,
                sort,
                order
            )}`,
            ServiceUtil.getAcceptHeader(format)
        ).then(response => {
            if (!(response instanceof Response)) {
                if (this.#objects_constructor && response.results) {
                    response.results = this.#objects_constructor(
                        this.#objects_api_adapter(response.results)
                    );
                    return response;
                }
                return this.#objects_constructor
                    ? this.#objects_constructor(this.#objects_api_adapter(response))
                    : response;
            }
            return response;
        });
    }

    getFeatures(filter) {
        return AuthApiService.get(
            `${this.#base_path}?${ServiceUtil.getGeoFilterQueryString(filter)}`,
            ServiceUtil.getAcceptHeader(ServiceRequestFormat.GEOJSON)
        ).then(response => {
            // TODO: get crs from config
            response["crs"] = {
                type: "name",
                properties: {
                    // name: "urn:ogc:def:crs:EPSG::25829",
                    name: "urn:ogc:def:crs:EPSG::32721",
                },
            };
            return response;
        });
    }

    getBySearchText(searchText) {
        return AuthApiService.get(this.#base_path + `?search=${searchText}`).then(
            response =>
                this.#objects_constructor
                    ? this.#objects_constructor(
                          this.#objects_api_adapter(response.results)
                      )
                    : response
        );
    }

    get(id) {
        return AuthApiService.get(this.#base_path + "/" + id).then(response =>
            this.#object_constructor
                ? this.#object_constructor(this.#object_api_adapter(response))
                : response
        );
    }

    create(entity) {
        return AuthApiService.post(this.#base_path, entity).then(response =>
            this.#object_constructor
                ? this.#object_constructor(this.#object_api_adapter(response))
                : response
        );
    }

    update(entity) {
        return AuthApiService.put(this.#base_path + "/" + entity.id, entity).then(
            response =>
                this.#object_constructor
                    ? this.#object_constructor(this.#object_api_adapter(response))
                    : response
        );
    }

    updateWithPatch(entity) {
        return AuthApiService.patch(this.#base_path + "/" + entity.id, entity).then(
            response =>
                this.#object_constructor
                    ? this.#object_constructor(this.#object_api_adapter(response))
                    : response
        );
    }
}

const createEntityService = (
    base_path,
    object_constructor = null,
    objects_constructor = null,
    object_api_adapter = null,
    objects_api_adapter = null
) => {
    return new EntityService(
        base_path,
        object_constructor,
        objects_constructor,
        object_api_adapter,
        objects_api_adapter
    );
};

export default createEntityService;
