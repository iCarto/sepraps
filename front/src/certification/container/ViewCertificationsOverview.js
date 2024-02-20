import {useOutletContext} from "react-router-dom";
import {useContractCalendar} from "contract/presentational/hooks";
import {PaymentsFinancialData} from "payment/presentational";
import {ContractCalendar} from "contract/presentational";
import {CertificationCalendarItem} from "certification/presentational";
import PaperComponent from "base/shared/components/PaperComponent";
import Grid from "@mui/material/Grid";

const ViewCertificationsOverview = () => {
    const {project, certifications} = useOutletContext();
    const {contractYears, contractItemsWithDate} = useContractCalendar(
        project?.construction_contract,
        certifications
    );

    return (
        certifications && (
            <Grid container spacing={1} alignItems="flex-start">
                <Grid item xs={6}>
                    <PaperComponent>
                        {/* <PaymentsFinancialData contract={project} /> */}
                    </PaperComponent>
                </Grid>
                <Grid item xs={6}>
                    <PaperComponent>
                        <ContractCalendar
                            years={contractYears}
                            items={contractItemsWithDate}
                            itemsLabel="certificaciones"
                            itemComponent={CertificationCalendarItem}
                        />
                    </PaperComponent>
                </Grid>
            </Grid>
        )
    );
};

export default ViewCertificationsOverview;
