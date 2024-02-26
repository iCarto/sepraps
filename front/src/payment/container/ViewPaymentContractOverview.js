import {useOutletContext} from "react-router-dom";

import {useContractCalendar} from "contract/presentational/hooks";

import {PaymentCalendarItem, PaymentsFinancialData} from "payment/presentational";
import {ContractCalendar} from "contract/presentational";
import {NotificationsWidget} from "notification/presentational";
import {PaperComponent} from "base/shared/components";

import Grid from "@mui/material/Grid";

const ViewPaymentContractOverview = () => {
    const {contract, payments, paymentNotifications} = useOutletContext();

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
                <Grid item xs={6} container rowSpacing={1}>
                    {paymentNotifications?.length ? (
                        <Grid item xs={12}>
                            <PaperComponent>
                                <NotificationsWidget
                                    notifications={paymentNotifications}
                                />
                            </PaperComponent>
                        </Grid>
                    ) : null}
                    <Grid item xs={12}>
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
            </Grid>
        )
    );
};

export default ViewPaymentContractOverview;
