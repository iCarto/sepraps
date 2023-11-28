import {
    SubPageMenu,
    SubPageMenuListGroup,
    SubPageMenuListItemButton,
} from "base/ui/menu";
import {QuestionnairesMenu} from "questionnaire/presentational";
import {SelectProjectDropDown} from "project/menu";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import PinDropIconOutlined from "@mui/icons-material/PinDropOutlined";
import AccountBalanceIconOutlined from "@mui/icons-material/AccountBalanceOutlined";
import FlagIconOutlined from "@mui/icons-material/FlagOutlined";
import FolderOpenIconOutlined from "@mui/icons-material/FolderOpenOutlined";
import PermContactCalendarIconOutlined from "@mui/icons-material/PermContactCalendarOutlined";
import GroupsIconOutlined from "@mui/icons-material/GroupsOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";

const ProjectSubPageMenu = ({project}) => {
    const basePath = `/projects/list/${project?.id}`;

    const buildingSupervisionAreaSubmenuItems = [
        {
            to: `${basePath}/buildingcomponent`,
            text: "Componentes",
        },
    ];

    return (
        <SubPageMenu subPageMenuDropdown={<SelectProjectDropDown project={project} />}>
            <SubPageMenuListItemButton
                key="project-detail"
                to={`${basePath}/summary`}
                text="Resumen"
                icon={<InventoryRoundedIcon />}
            />
            <SubPageMenuListItemButton
                key="project-location"
                to={`${basePath}/location`}
                text="Ubicación"
                icon={<PinDropIconOutlined />}
            />
            <SubPageMenuListItemButton
                key="project-provider"
                to={`${basePath}/provider`}
                text="Prestador"
                icon={<GroupsIconOutlined />}
            />
            <SubPageMenuListItemButton
                key="project-financing"
                to={`${basePath}/financing`}
                text="Financiación"
                icon={<AccountBalanceIconOutlined />}
            />
            <SubPageMenuListItemButton
                key="project-milestones"
                to={`${basePath}/milestones`}
                text="Hitos"
                icon={<FlagIconOutlined />}
            />
            <SubPageMenuListItemButton
                key="project-documents"
                to={`${basePath}/documents`}
                text="Documentos"
                icon={<FolderOpenIconOutlined />}
            />
            <SubPageMenuListItemButton
                key="project-contacts"
                to={`${basePath}/contacts`}
                text="Contactos"
                icon={<PermContactCalendarIconOutlined />}
            />
            <SubPageMenuListItemButton
                key="project-fieldreport"
                to={`${basePath}/fieldreport`}
                text="Informes de viaje"
                icon={<DirectionsCarFilledOutlinedIcon />}
            />
            <QuestionnairesMenu
                questionnaires={project?.questionnaires}
                basePath={`/projects/list/${project?.id}`}
            />
            <SubPageMenuListGroup
                headerTitle="Supervisión de obra"
                headerIcon={<HandymanOutlinedIcon />}
                items={buildingSupervisionAreaSubmenuItems}
                expanded={true}
            />
        </SubPageMenu>
    );
};

export default ProjectSubPageMenu;
