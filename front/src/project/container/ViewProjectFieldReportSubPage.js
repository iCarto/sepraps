import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {DateUtil} from "base/format/utilities";
import {RouterUtil} from "base/navigation/utilities";

import {FieldReportService} from "fieldReport/service";
import {FieldReportSummarySection} from "fieldReport/presentational/section";
import {FieldReportProjectContent} from "fieldReportProject/presentational/section";

import {ContentLayoutWithAside, SubpageWithSelectorContainer} from "base/ui/main";
import {AlertError} from "base/error/components";

import {ListSelector, ListSelectorItem} from "base/shared/components";
import {EntityContent} from "base/entity/components/presentational";

import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";

const ViewProjectFieldReportSubPage = () => {
    const navigate = useNavigate();
    const {id: projectId, fieldReportId} = useParams();

    const [fieldReport, setFieldReport] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const location = useLocation();
    const isRootPath = RouterUtil.getLastUrlSegment(location) === "fieldreport";

    const [fieldReportsForProject, setFieldReportsForProject] = useState([]);

    useEffect(() => {
        if ((projectId && !fieldReportId) || !fieldReportsForProject) {
            FieldReportService.getList({project: projectId}).then(fieldReports => {
                setFieldReportsForProject(fieldReports);
                if (!fieldReportId && fieldReports.length > 0) {
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
        <SubpageWithSelectorContainer
            itemsName="informes"
            itemSelector={
                <ListSelector
                    title="Informes"
                    items={fieldReportsForProject}
                    renderItem={fieldReport => (
                        <ListSelectorItem
                            key={fieldReport.id}
                            heading={DateUtil.formatDate(fieldReport.date)}
                            to={`/projects/list/${projectId}/fieldreport/${fieldReport.id}`}
                            selected={parseInt(fieldReportId) === fieldReport.id}
                        />
                    )}
                />
            }
            noItems={
                isRootPath &&
                fieldReportsForProject &&
                fieldReportsForProject.length === 0
            }
        >
            <ContentLayoutWithAside>
                <AlertError error={error} />
                {fieldReport && (
                    <EntityContent
                        entityLabel="Informe de viaje"
                        entityName={fieldReport.code}
                        entityIcon={<DirectionsCarFilledOutlinedIcon />}
                    >
                        <FieldReportSummarySection
                            fieldReport={fieldReport}
                            secondaryAction={
                                <Tooltip title="Ver informe completo">
                                    <Button
                                        aria-label="view-field-report"
                                        target="_blank"
                                        href={`/field-reports/list/${fieldReport.id}/summary`}
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
                    </EntityContent>
                )}
            </ContentLayoutWithAside>
        </SubpageWithSelectorContainer>
    );
};

export default ViewProjectFieldReportSubPage;
