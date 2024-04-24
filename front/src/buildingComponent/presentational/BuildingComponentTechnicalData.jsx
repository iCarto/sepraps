import {DynamicSectionFields} from "base/dynamicform/components";

const BuildingComponentTechnicalData = ({data}) => {
    return data && <DynamicSectionFields attributes={data} columns={2} />;
};

export default BuildingComponentTechnicalData;
