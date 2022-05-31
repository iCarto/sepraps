import {useNavigate, useOutletContext} from "react-router-dom";
import {useAuth} from "auth";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";

const ContractGeneralDataSection = ({isSidePanelOpen = null}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    let contract;
    [contract] = useOutletContext();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("generaldata/edit");
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT]}
        />,
    ];

    return (
        <SectionCard
            title="Datos generales"
            secondaryActions={secondaryActions}
            isSidePanelOpen={isSidePanelOpen}
        >
            <SectionField label="Número:" value={contract.number} />
            <SectionField label="Descripción:" value={contract.comments} />
        </SectionCard>
    );
};

export default ContractGeneralDataSection;
