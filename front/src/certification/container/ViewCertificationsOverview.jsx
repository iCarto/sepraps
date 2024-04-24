import {useOutletContext} from "react-router-dom";
import {useContractCalendar} from "contract/presentational/hooks";
import {ContractCalendar} from "contract/presentational";
import {
    CertificationCalendarItem,
    CertificationsSummaryBox,
} from "certification/presentational";
import {PaperComponent} from "base/shared/components";

import Grid from "@mui/material/Grid";
import {NotificationsWidget} from "notification/presentational";

const ViewCertificationsOverview = () => {
    const {project, certifications, certifNotifications} = useOutletContext();
    const {contractYears, contractItemsWithDate} = useContractCalendar(
        project?.construction_contract,
        certifications
    );

    return (
        certifications && (
            <Grid container spacing={1} alignItems="flex-start">
                <Grid item xs={6}>
                    <PaperComponent>
                        <CertificationsSummaryBox
                            certifications={certifications}
                            contract={project?.construction_contract}
                        />
                    </PaperComponent>
                </Grid>
                <Grid item xs={6} container rowSpacing={1}>
                    {certifNotifications?.length ? (
                        <Grid item xs={12}>
                            <PaperComponent>
                                <NotificationsWidget
                                    notifications={certifNotifications}
                                />
                            </PaperComponent>
                        </Grid>
                    ) : null}
                    <Grid item xs={12}>
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
            </Grid>
        )
    );
};

export default ViewCertificationsOverview;
