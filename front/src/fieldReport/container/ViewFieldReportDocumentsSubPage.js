import {useLocation, useOutletContext} from "react-router-dom";
import {ViewDocumentsSubPage} from "base/file/components";

const ViewFieldReportDocumentsSubPage = () => {
    let fieldReport;
    [fieldReport] = useOutletContext();

    const location = useLocation();
    const basePath = location.pathname.split("/field-reports/")[0];

    return (
        fieldReport && (
            <ViewDocumentsSubPage
                entity={fieldReport}
                basePath={`${basePath}/field-reports`}
            />
        )
    );
};

export default ViewFieldReportDocumentsSubPage;
