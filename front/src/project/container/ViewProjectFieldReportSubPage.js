import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {FieldReportService} from "fieldReport/service";
import {FieldReportSummarySection} from "fieldReport/presentational/section";
import {ContentLayout} from "base/ui/main";
import {AlertError} from "base/error/components";
import {FieldReportProjectContent} from "fieldReportProject/presentational/section";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const ViewProjectFieldReportSubPage = () => {
    const {id: projectId, fieldReportId} = useParams();

    const [fieldReport, setFieldReport] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        FieldReportService.getFieldReportForProject(projectId, fieldReportId)
            .then(fieldReport => {
                console.log({fieldReport});
                setIsLoading(false);
                setFieldReport(fieldReport);
            })
            .catch(error => {
                setError(error);
            });
    }, [projectId, fieldReportId]);

    return (
        fieldReport && (
            <ContentLayout>
                <AlertError error={error} />
                <FieldReportSummarySection
                    fieldReport={fieldReport}
                    secondaryAction={
                        <Tooltip title="Ver informe completo">
                            <Button
                                aria-label="view-field-report"
                                target="_blank"
                                href={`/field-reports/${fieldReportId}/summary`}
                                variant="contained"
                                startIcon={<OpenInNewIcon />}
                            >
                                Ver informe
                            </Button>
                        </Tooltip>
                    }
                />
                <FieldReportProjectContent
                    fieldReportProject={fieldReport.field_report_projects[0]}
                />
            </ContentLayout>
        )
    );
};

export default ViewProjectFieldReportSubPage;
