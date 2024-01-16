import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {RouterUtil} from "base/navigation/utilities";

import {ViewPaymentFinancialChart} from ".";
import {SectionCard} from "base/ui/section/components";
import {SubpageWithSelectorContainer} from "base/ui/main";
import {PaymentListSelector} from "payment/presentational";

import Grid from "@mui/material/Grid";

const ViewPaymentsAnalysisContent = () => {
    const {payments} = useOutletContext();
    const {id: contractId, paymentId} = useParams();

    const location = useLocation();
    const isRootPath = RouterUtil.getLastUrlSegment(location) === "payment";

    return (
        <SubpageWithSelectorContainer
            itemsName="componentes de construcción"
            itemSelector={
                <PaymentListSelector
                    payments={payments}
                    basePath={`/contracts/list/${contractId}/payment`}
                    selectedPaymentId={parseInt(paymentId)}
                />
            }
            noItems={isRootPath && payments && payments.length === 0}
        >
            <SectionCard title="Productos">
                <Grid width={{xs: "100%", lg: "80%", xl: "75%"}} pt={1} pb={2}>
                    <ViewPaymentFinancialChart filter={{contract: contractId}} />
                </Grid>
            </SectionCard>
        </SubpageWithSelectorContainer>
    );
};

export default ViewPaymentsAnalysisContent;
