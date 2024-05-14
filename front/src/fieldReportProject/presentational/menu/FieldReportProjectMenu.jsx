import {useEffect, useState} from "react";
import {FieldReportService} from "fieldReport/service";
import {DateUtil} from "base/format/utilities";
import {SubPageMenuListGroup} from "base/ui/menu";

import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

const FieldReportProjectMenu = ({projectId, basePath}) => {
    const [fieldReportsForProject, setFieldReportsForProject] = useState([]);

    useEffect(() => {
        if (projectId) {
            FieldReportService.getList({project: projectId}).then(fieldReports => {
                setFieldReportsForProject(
                    fieldReports.map(fieldReport => {
                        return {
                            to: `${basePath}/fieldreport/${fieldReport.id}`,
                            text: DateUtil.formatDate(fieldReport.date),
                        };
                    })
                );
            });
        }
    }, [projectId]);

    return (
        <SubPageMenuListGroup
            id="field_report"
            headerTitle="Informes de viaje"
            headerIcon={<AssignmentOutlinedIcon />}
            items={fieldReportsForProject}
        />
    );
};

export default FieldReportProjectMenu;
