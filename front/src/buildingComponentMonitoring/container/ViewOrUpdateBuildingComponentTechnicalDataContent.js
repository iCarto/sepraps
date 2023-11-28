import {useState} from "react";
import {useNavigateWithReload} from "base/navigation/hooks";
import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {BuildingCompontentTechnicalData} from "buildingComponentMonitoring/presentational";

import EditIcon from "@mui/icons-material/Edit";

const ViewOrUpdateBuildingComponentTechnicalDataContent = ({buildingComponent}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

    const handleFormSubmit = contractService => {
        console.log({contractService});
        // ContractServiceService.update(
        //     contract_service_view_adapter({...contractService})
        // )
        //     .then(updatedContractService => {
        //         setMode("view");
        //         navigate("", true);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         setError(error);
        //     });
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
                <BuildingCompontentTechnicalData
                    buildingComponent={buildingComponent}
                />
            );
        }
        if (mode === "edit") {
            return;
            // return (
            //     <ContractServiceForm
            //         buildingComponent={buildingComponent}
            //         onSubmit={handleFormSubmit}
            //         onCancel={() => {
            //             setMode("view");
            //         }}
            //         error={error}
            //     />
            // );
        }
    };

    return (
        buildingComponent.properties &&
        Object.keys(buildingComponent.properties).length > 0 && (
            <SectionCard title="Datos técnicos" secondaryActions={actions}>
                {getComponent(mode)}
            </SectionCard>
        )
    );
};

export default ViewOrUpdateBuildingComponentTechnicalDataContent;
