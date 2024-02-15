import {useOutletContext} from "react-router-dom";
import {useContractCalendar} from "contract/presentational/hooks";
import {PaymentCalendarItem, PaymentsFinancialData} from "payment/presentational";
import {ContractCalendar} from "contract/presentational";
import {PaperComponent} from "base/shared/components";

import Grid from "@mui/material/Grid";

const ViewPaymentContractOverview = () => {
    const {contract, payments} = useOutletContext();

    const {contractYears, contractItemsWithDate} = useContractCalendar(
        contract,
        payments
    );

    return (
        payments && (
            <Grid container spacing={1} alignItems="flex-start">
                <Grid item xs={6}>
                    <PaperComponent>
                        <PaymentsFinancialData contract={contract} />
                    </PaperComponent>
                </Grid>
                <Grid item xs={6}>
                    <PaperComponent>
                        <ContractCalendar
                            years={contractYears}
                            items={contractItemsWithDate}
                            itemsLabel="productos"
                            itemComponent={PaymentCalendarItem}
                        />
                    </PaperComponent>
                </Grid>
            </Grid>
        )
    );
};

export default ViewPaymentContractOverview;
