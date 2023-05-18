import {useNavigate} from "react-router-dom";
import {DateUtil} from "base/format/utilities";
import {FieldUtil} from "base/ui/section/utilities";

import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import EditIcon from "@mui/icons-material/Edit";

const ContractPostConstructionSection = ({contract}) => {
    const navigate = useNavigate();

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

    return (
        <SectionCard title="Post construcción" secondaryActions={secondaryActions}>
            {FieldUtil.getSectionField(
                "Fin del periodo de garantía",
                DateUtil.formatDate(contract?.warranty_end_date)
            )}
        </SectionCard>
    );
};

export default ContractPostConstructionSection;
