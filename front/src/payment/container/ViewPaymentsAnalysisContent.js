import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {RouterUtil} from "base/navigation/utilities";

import {ViewPaymentContractFinancialChart} from ".";
import {SectionCard} from "base/ui/section/components";
import {SubpageWithSelectorContainer} from "base/ui/main";
import {PaymentListSelector} from "payment/presentational";

import Grid from "@mui/material/Grid";

const ViewPaymentsAnalysisContent = () => {
    const {contract} = useOutletContext();

    const location = useLocation();
    const isRootPath = RouterUtil.getLastUrlSegment(location) === "payment";

    return (
        <SectionCard title="Seguimiento financiero">
            <ViewPaymentContractFinancialChart contract={contract} />
        </SectionCard>
    );
};

export default ViewPaymentsAnalysisContent;
