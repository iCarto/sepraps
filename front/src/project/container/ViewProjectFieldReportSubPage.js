import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {FieldReportService} from "fieldReport/service";
import {FieldReportSummarySection} from "fieldReport/presentational/section";
import {ContentLayout} from "base/ui/main";
import {AlertError} from "base/error/components";
import {FieldReportProjectContent} from "fieldReportProject/presentational/section";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import {Link} from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import {DateUtil} from "base/format/utilities";
import {styled} from "@mui/material/styles";

import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {TextLink} from "base/navigation/components";
import {FieldReportList} from "fieldReport/presentational";

const CardContentNoPadding = styled(CardContent)(`
  padding: 3px 10px;
  &:last-child {
    padding-bottom: 0;
  }
`);

const ViewProjectFieldReportSubPage = () => {
    const navigate = useNavigate();
    const {id: projectId, fieldReportId} = useParams();

    const [fieldReport, setFieldReport] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [fieldReportsForProject, setFieldReportsForProject] = useState(null);

    useEffect(() => {
        if ((projectId && !fieldReportId) || !fieldReportsForProject) {
            FieldReportService.getList({project: projectId}).then(fieldReports => {
                setFieldReportsForProject(fieldReports);
                if (!fieldReportId) {
                    navigate(fieldReports[0].id.toString());
                }
            });
        }
    }, [projectId]);

    useEffect(() => {
        if (projectId && fieldReportId) {
            setIsLoading(true);
            FieldReportService.getFieldReportForProject(projectId, fieldReportId)
                .then(fieldReport => {
                    setIsLoading(false);
                    setFieldReport(fieldReport);
                })
                .catch(error => {
                    setError(error);
                });
        }
    }, [fieldReportId]);

    return (
        <ContentLayout>
            <AlertError error={error} />
            <Grid container spacing={1}>
                <Grid item xs={10}>
                    {fieldReport && (
                        <>
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
                                fieldReportProject={
                                    fieldReport.field_report_projects[0]
                                }
                            />
                        </>
                    )}
                </Grid>
                <Grid item xs={2}>
                    <FieldReportList
                        fieldReports={fieldReportsForProject}
                        basePath={`/projects/${projectId}/fieldreport`}
                        selectedFieldReportId={parseInt(fieldReportId)}
                    />
                </Grid>
            </Grid>
        </ContentLayout>
    );
};

export default ViewProjectFieldReportSubPage;
