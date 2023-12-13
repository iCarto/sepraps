import {DynamicSectionFields} from "base/dynamicform/components";

const BuildingComponentTechnicalData = ({buildingComponent}) => {
    return (
        buildingComponent &&
        buildingComponent.properties && (
            <DynamicSectionFields
                attributes={buildingComponent.properties}
                columns={2}
            />
        )
    );
};

export default BuildingComponentTechnicalData;
