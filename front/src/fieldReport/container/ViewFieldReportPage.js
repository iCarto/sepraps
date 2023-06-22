import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

import {FieldReportService} from "fieldReport/service";
import {useConfigModule} from "base/ui/module/provider";

import {PageLayout} from "base/ui/main";
import {FieldReportSubPageMenu} from "fieldReport/menu";

const ViewFieldReportPage = () => {
    const {id} = useParams();
    const [fieldReport, setFieldReport] = useState(null);
    const location = useLocation();

    const {addToModuleFilter, setModuleBasePath} = useConfigModule();

    useEffect(() => {
        setFieldReport(null);
        setModuleBasePath(`/fieldReports/${id}`);
        FieldReportService.get(id).then(data => {
            addToModuleFilter({fieldReport: data.id});
            setFieldReport(data);
        });
    }, [id, location.state?.lastRefreshDate]);

    return (
        fieldReport && (
            <PageLayout
                menu={<FieldReportSubPageMenu fieldReport={fieldReport} />}
                context={[fieldReport]}
                subPage={true}
            />
        )
    );
};
export default ViewFieldReportPage;
