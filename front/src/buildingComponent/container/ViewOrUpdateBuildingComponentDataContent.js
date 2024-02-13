import {useState} from "react";
import {BuildingComponentService} from "buildingComponent/service";
import {building_component_view_adapter} from "buildingComponent/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {BuildingComponentTechnicalDataForm} from "buildingComponentMonitoring/presentational/form";
import {BuildingComponentTechnicalData} from "buildingComponent/presentational";

import EditIcon from "@mui/icons-material/Edit";

const ViewOrUpdateBuildingComponentDataContent = ({
    buildingComponent,
    sectionName,
    propertiesKey,
}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

    const handleFormSubmit = updatedData => {
        BuildingComponentService.update(
            building_component_view_adapter({...buildingComponent, ...updatedData})
        )
            .then(updatedBuildingComponent => {
                setMode("view");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const actions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                setMode("edit");
            }}
        />,
    ];

    const getComponent = mode => {
        if (mode === "view") {
            return (
                <BuildingComponentTechnicalData
                    data={buildingComponent[propertiesKey]}
                />
            );
        }
        if (mode === "edit") {
            return (
                <BuildingComponentTechnicalDataForm
                    buildingComponent={buildingComponent}
                    propertiesKey={propertiesKey}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                />
            );
        }
    };

    return buildingComponent[propertiesKey] &&
        Object.keys(buildingComponent[propertiesKey]).length > 0 ? (
        <SectionCard title={sectionName} secondaryActions={actions}>
            {getComponent(mode)}
        </SectionCard>
    ) : null;
};

export default ViewOrUpdateBuildingComponentDataContent;
