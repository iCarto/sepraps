import {useState} from "react";

import {SectionCard} from "base/ui/section/components";
import {FinancingProgramGeneralDataSection} from "financingprogram/presentational/section";

const ViewOrUpdateFinancingProgramGeneralDataContent = ({financingprogram}) => {
    const [mode, setMode] = useState("view");

    const getComponent = mode => {
        if (mode === "view") {
            return (
                <FinancingProgramGeneralDataSection
                    financingprogram={financingprogram}
                />
            );
        }
    };

    return <SectionCard title="Información">{getComponent("view")}</SectionCard>;
};

export default ViewOrUpdateFinancingProgramGeneralDataContent;
