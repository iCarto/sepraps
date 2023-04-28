import {useNavigate} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "base/section/components";

import EditIcon from "@mui/icons-material/Edit";

const ContractGeneralDataSection = ({contract}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate(`generaldata/edit`);
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    return (
        <SectionCard title="Información" secondaryActions={secondaryActions}>
            <SectionField label="Número" value={contract?.number} />
            <SectionField label="Descripción" value={contract?.comments} />
        </SectionCard>
    );
};

export default ContractGeneralDataSection;
