import {DateUtil} from "base/format/utilities";
import {SubPageMenu, PageMenuListItemButton} from "base/ui/menu";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import TourIcon from "@mui/icons-material/Tour";

const FieldReportSubPageMenu = ({fieldReport}) => {
    const basePath = `/field-reports/${fieldReport?.id}`;

    return (
        <SubPageMenu
            headerText={`${fieldReport.report_code}`}
            headerTitle={`${DateUtil.formatDate(fieldReport.report_date)}`}
        >
            <PageMenuListItemButton
                key="fieldReport-summary"
                to={`${basePath}/summary`}
                text="Resumen"
                icon={<InventoryRoundedIcon />}
            />
            <PageMenuListItemButton
                key="fieldReport-projects"
                to={`${basePath}/projects`}
                text="Proyectos visitados"
                icon={<TourIcon />}
            />
        </SubPageMenu>
    );
};

export default FieldReportSubPageMenu;
