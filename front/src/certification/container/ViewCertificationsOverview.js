import {useOutletContext} from "react-router-dom";
import {PaymentCalendar, PaymentsFinancialData} from "payment/presentational";
import {SectionCard} from "base/ui/section/components";
import PaperComponent from "base/shared/components/PaperComponent";
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";

const ViewCertificationsOverview = () => {
    const {project, certifications} = useOutletContext();
    const context = useOutletContext();

    // let startDate = new Date(project?.execution_start_date);
    // let endDate = new Date(
    //     project?.amended_expected_execution_end_date ||
    //         project?.expected_execution_end_date
    // );
    // const certificationsWithDate =
    //     certifications &&
    //     certifications.map(certification => {
    //         const certificationDate = certification.approval_date;
    //         return {
    //             ...certification,
    //             certificationDate: certificationDate
    //                 ? new Date(certificationDate)
    //                 : null,
    //         };
    //     });
    // if (certificationsWithDate?.length > 0) {
    //     if (
    //         certificationsWithDate[0].certificationDate?.getTime() < startDate.getTime()
    //     ) {
    //         startDate =
    //             certificationsWithDate[certificationsWithDate.length - 1]
    //                 .certificationDate;
    //     }
    //     if (
    //         certificationsWithDate[
    //             certificationsWithDate.length - 1
    //         ].certificationDate?.getTime() > endDate.getTime()
    //     ) {
    //         endDate =
    //             certificationsWithDate[certificationsWithDate.length - 1]
    //                 .certificationDate;
    //     }
    // }
    // const contractYears = Array(endDate.getFullYear() - startDate.getFullYear() + 1)
    //     .fill()
    //     .map((_, idx) => startDate.getFullYear() + idx);

    return (
        certifications && (
            <Grid container spacing={1} alignItems="flex-start">
                <Grid item xs={6}>
                    {/* <PaperComponent>
                        <PaymentsFinancialData contract={project} />
                    </PaperComponent> */}
                </Grid>
                <Grid item xs={6}>
                    <PaperComponent>
                        <SectionCard title="Calendario de certificaciones">
                            {/* <PaymentCalendar
                                years={contractYears}
                                payments={certificationsWithDate}
                            /> */}
                        </SectionCard>
                    </PaperComponent>
                </Grid>
            </Grid>
        )
    );
};

export default ViewCertificationsOverview;
