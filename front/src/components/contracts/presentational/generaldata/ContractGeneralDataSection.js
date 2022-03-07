import {useNavigate, useOutletContext} from "react-router-dom";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";

const ContractGeneralDataSection = () => {
    const navigate = useNavigate();

    let contract;
    [contract] = useOutletContext();

    return (
        <SectionCard
            title="Datos generales"
            secondaryActions={[
                <SectionCardHeaderAction
                    key="edit"
                    name="edit"
                    text="Modificar"
                    icon={<EditIcon />}
                    onClick={() => {
                        navigate("edit");
                    }}
                />,
            ]}
        >
            <SectionField label="Número:" value={contract.number} />
            <SectionField label="Observaciones:" value={contract.comments} />
        </SectionCard>
    );
};

export default ContractGeneralDataSection;
