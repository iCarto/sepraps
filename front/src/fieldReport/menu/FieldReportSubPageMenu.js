import {DateUtil} from "base/format/utilities";
import {SubPageMenu, PageMenuListItemButton, SubPageMenuListGroup} from "base/ui/menu";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";

import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

const FieldReportSubPageMenu = ({fieldReport}) => {
    const basePath = `/field-reports/${fieldReport?.id}`;

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
            <PageMenuListItemButton
                key="field-report-summary"
                to={`${basePath}/summary`}
                text="Resumen"
                icon={<InventoryRoundedIcon />}
            />
            <SubPageMenuListGroup
                headerTitle="Contenido"
                headerIcon={<FormatListBulletedOutlinedIcon />}
                items={contentSubmenuItems}
                expanded={true}
            />
            <PageMenuListItemButton
                key="field-report-documents"
                to={`${basePath}/documents`}
                text="Documentos"
                icon={<FolderOpenIcon />}
            />
        </SubPageMenu>
    );
};

export default FieldReportSubPageMenu;
