import {useState} from "react";

import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {useNavigateWithReload} from "base/navigation/hooks";

import EditIcon from "@mui/icons-material/Edit";
import {ContractService} from "contract/service";
import {
    SUPERVISION_AREAS,
    contract_supervision_area_view_adapter,
} from "contract/model";
import {ContractSupervisionAreaData} from "contract/presentational/section";
import {ContractSupervisionAreaForm} from "contract/presentational/form";

const ViewOrUpdateSupervisionAreaContent = ({supervisionArea}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

    const handleFormSubmit = supervisionArea => {
        ContractService.updateSupervisionArea(
            contract_supervision_area_view_adapter({...supervisionArea})
        )
            .then(updatedSupervisionArea => {
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
            return <ContractSupervisionAreaData supervisionArea={supervisionArea} />;
        }
        if (mode === "edit") {
            return (
                <ContractSupervisionAreaForm
                    supervisionArea={supervisionArea}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                />
            );
        }
    };

    const getTitle = area => {
        return area === SUPERVISION_AREAS.BUILDING
            ? "Supervisión técnica"
            : area === SUPERVISION_AREAS.SOCIAL
            ? "Supervisión social"
            : null;
    };

    return (
        supervisionArea && (
            <SectionCard
                title={getTitle(supervisionArea.code)}
                secondaryActions={actions}
            >
                {getComponent(mode)}
            </SectionCard>
        )
    );
};

export default ViewOrUpdateSupervisionAreaContent;
