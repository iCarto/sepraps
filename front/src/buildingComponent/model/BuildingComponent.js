class BuildingComponents extends Array {}

const building_component_api_adapter = buildingComponent => {
    return buildingComponent;
};

const building_component_view_adapter = buildingComponent => {
    delete buildingComponent["created_by"];
    delete buildingComponent["created_at"];
    delete buildingComponent["updated_by"];
    delete buildingComponent["updated_at"];

    return buildingComponent;
};

const building_components_api_adapter = buildingComponents => {
    return buildingComponents.map(building_component_api_adapter);
};

const createBuildingComponents = (data = []) => {
    const buildingComponents = BuildingComponents.from(data, buildingComponent =>
        createBuildingComponent(buildingComponent)
    );
    return buildingComponents;
};

const createBuildingComponent = ({
    id = null,
    code = "",
    code_label = "",
    name = "",
    technical_properties = null,
    validation_properties = null,
    created_by = "",
    created_at = null,
    updated_by = "",
    updated_at = null,
} = {}) => {
    const publicApi = {
        id,
        code,
        code_label,
        name,
        technical_properties,
        validation_properties,
        created_by,
        created_at,
        updated_at,
        updated_by,
    };

    return Object.freeze(publicApi);
};

export {
    createBuildingComponent as default,
    createBuildingComponents,
    building_component_api_adapter,
    building_components_api_adapter,
    building_component_view_adapter,
};
