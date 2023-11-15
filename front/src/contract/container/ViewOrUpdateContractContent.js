import {useState} from "react";

import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ContractService} from "contract/service";
import {contract_view_adapter} from "contract/model";
import {
    ContractAwardingSection,
    ContractBidRequestSection,
    ContractExecutionSection,
    ContractFinancingProgramSection,
    ContractGeneralDataSection,
    ContractInsuranceSection,
    ContractPostConstructionSection,
} from "contract/presentational/section";
import {
    ContractAwardingFormFields,
    ContractBidRequestFormFields,
    ContractExecutionFormFields,
    ContractFinancingFormFields,
    ContractForm,
    ContractGeneralDataFormFields,
    ContractInsuranceFormFields,
    ContractPostConstructionFormFields,
} from "contract/presentational/form";

import EditIcon from "@mui/icons-material/Edit";

const ViewOrUpdateContractContent = ({contract, section, label}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

    const handleFormSubmit = contract => {
        ContractService.update(contract_view_adapter({...contract}))
            .then(updatedContract => {
                setMode("view");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const getDataComponent = section => {
        if (section === "generaldata") {
            return <ContractGeneralDataSection contract={contract} />;
        }
        if (section === "financing_program") {
            return <ContractFinancingProgramSection contract={contract} />;
        }
        if (section === "bidrequest") {
            return <ContractBidRequestSection contract={contract} />;
        }
        if (section === "awarding") {
            return <ContractAwardingSection contract={contract} />;
        }
        if (section === "insurance") {
            return <ContractInsuranceSection contract={contract} />;
        }
        if (section === "execution") {
            return <ContractExecutionSection contract={contract} />;
        }
        if (section === "postconstruction") {
            return <ContractPostConstructionSection contract={contract} />;
        }
    };

    const getFormComponent = section => {
        if (section === "generaldata") {
            return <ContractGeneralDataFormFields />;
        }
        if (section === "financing_program") {
            return <ContractFinancingFormFields />;
        }
        if (section === "bidrequest") {
            return <ContractBidRequestFormFields />;
        }
        if (section === "awarding") {
            return <ContractAwardingFormFields />;
        }
        if (section === "insurance") {
            return <ContractInsuranceFormFields />;
        }
        if (section === "execution") {
            return <ContractExecutionFormFields />;
        }
        if (section === "postconstruction") {
            return <ContractPostConstructionFormFields />;
        }
    };

    const getComponent = mode => {
        if (mode === "view") {
            return getDataComponent(section);
        }
        if (mode === "edit") {
            return (
                <ContractForm
                    contract={contract}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                >
                    {getFormComponent(section)}
                </ContractForm>
            );
        }
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

    return (
        <SectionCard title={label} secondaryActions={actions}>
            {getComponent(mode)}
        </SectionCard>
    );
};

export default ViewOrUpdateContractContent;