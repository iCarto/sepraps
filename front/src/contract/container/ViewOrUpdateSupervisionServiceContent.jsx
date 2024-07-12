import {useState} from "react";

import {ContractServiceService} from "contract/service";
import {contract_service_view_adapter} from "contract/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {ContractServiceData} from "contract/presentational/section";
import {ContractServiceForm} from "contract/presentational/form";

import EditIcon from "@mui/icons-material/Edit";

const ViewOrUpdateSupervisionServiceContent = ({contractService}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

    const handleFormSubmit = contractService => {
        console.log({contractService});
        return ContractServiceService.update(
            contract_service_view_adapter({...contractService})
        )
            .then(updatedContractService => {
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
            return <ContractServiceData contractService={contractService} />;
        }
        if (mode === "edit") {
            return (
                <ContractServiceForm
                    contractService={contractService}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                />
            );
        }
    };

    return (
        contractService &&
        contractService.properties &&
        Object.keys(contractService.properties).length > 0 && (
            <SectionCard title={contractService.name} secondaryActions={actions}>
                {getComponent(mode)}
            </SectionCard>
        )
    );
};

export default ViewOrUpdateSupervisionServiceContent;
