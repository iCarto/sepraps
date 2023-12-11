import {DateUtil} from "base/format/utilities";
import {
    SubPageMenu,
    SubPageMenuListItemButton,
    SubPageMenuListGroup,
} from "base/ui/menu";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";

const FieldReportSubPageMenu = ({fieldReport}) => {
    const basePath = `/field-reports/list/${fieldReport?.id}`;

    const contentSubmenuItems = [
        {
            to: `${basePath}/cover`,
            text: "Portada",
        },
        {
            to: `${basePath}/intro`,
            text: "Introducción",
        },
        {
            to: `${basePath}/projects`,
            text: "Trabajo realizado",
        },
    ];

    return (
        <SubPageMenu
            headerText={`${fieldReport.code}`}
            headerTitle={`${DateUtil.formatDate(fieldReport.date)}`}
        >
            <SubPageMenuListItemButton
                key="field-report-summary"
                to={`${basePath}/summary`}
                text="Resumen"
                icon={<InventoryRoundedIcon />}
            />
            <SubPageMenuListGroup
                id="content"
                headerTitle="Contenido"
                headerIcon={<FormatListBulletedOutlinedIcon />}
                items={contentSubmenuItems}
                defaultExpanded
            />
            <SubPageMenuListItemButton
                key="field-report-documents"
                to={`${basePath}/documents`}
                text="Documentos"
                icon={<FolderOpenOutlinedIcon />}
            />
        </SubPageMenu>
    );
};

export default FieldReportSubPageMenu;
