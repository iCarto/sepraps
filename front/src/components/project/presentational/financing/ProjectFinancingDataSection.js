import {useNavigate, useOutletContext} from "react-router-dom";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";

const ProjectFinancingDataSection = () => {
    const navigate = useNavigate();

    let project;
    [project] = useOutletContext();

    const headerActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("edit");
            }}
        />,
    ];

    return (
        <SectionCard title="Programa" secondaryActions={headerActions}>
            <SectionField
                label="Programa de financiación:"
                value={project.financing_program_name}
            />
            <SectionField label="Financiador:" value={project.financing_fund_name} />
        </SectionCard>
    );
};

export default ProjectFinancingDataSection;
