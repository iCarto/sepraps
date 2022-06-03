import {useOutletContext, useNavigate} from "react-router-dom";
import {DateUtil} from "utilities";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import EditIcon from "@mui/icons-material/Edit";

const ContractPostConstructionSection = () => {
    const navigate = useNavigate();

    let contract;
    [contract] = useOutletContext();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("postconstruction/edit");
            }}
        />,
    ];

    const getDatetInfo = (label, date) => (
        <SectionField label={label} value={DateUtil.formatDate(date)} />
    );

    const getNoDatetInfo = label => (
        <SectionField label={label} value="Pendiente" valueFontStyle="italic" />
    );

    return (
        <SectionCard title="Post construcción" secondaryActions={secondaryActions}>
            {contract.warranty_end_date
                ? getDatetInfo(
                      "Fin del periodo de garantía:",
                      contract.warranty_end_date
                  )
                : getNoDatetInfo("Fin del periodo de garantía:")}
        </SectionCard>
    );
};

export default ContractPostConstructionSection;
