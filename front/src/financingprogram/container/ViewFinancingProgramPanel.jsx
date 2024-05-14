import {useNavigate, useParams} from "react-router-dom";
import {FinancingProgramService} from "financingprogram/service";

import {EntitySummaryPanel} from "base/entity/components/presentational";
import {SectionField} from "base/ui/section/components";

const ViewFinancingProgramPanel = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const getSectionData = financingprogram => {
        return (
            <>
                <SectionField label="Nombre" value={financingprogram.name} />
                <SectionField
                    label="Financiador/es"
                    value={financingprogram?.financing_funds
                        .map(financing_fund => financing_fund.name)
                        .join(", ")}
                />
            </>
        );
    };

    const handleClickDetail = () => {
        navigate(`/financingprograms/list/${id}`);
    };

    return (
        <EntitySummaryPanel
            service={FinancingProgramService}
            id={id}
            title="Programa de financiación"
            getSectionTitle={financingprogram => financingprogram?.short_name}
            getSectionData={getSectionData}
            onClickDetailButton={handleClickDetail}
        />
    );
};

export default ViewFinancingProgramPanel;
