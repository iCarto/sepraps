import {
    SubPageMenu,
    SubPageMenuListGroup,
    SubPageMenuListItemButton,
} from "base/ui/menu";
import {QuestionnairesMenu} from "questionnaire/presentational";
import {SelectProjectDropDown} from "project/menu";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import PinDropIconOutlined from "@mui/icons-material/PinDropOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import FlagIconOutlined from "@mui/icons-material/FlagOutlined";
import FolderOpenIconOutlined from "@mui/icons-material/FolderOpenOutlined";
import PermContactCalendarIconOutlined from "@mui/icons-material/PermContactCalendarOutlined";
import GroupsIconOutlined from "@mui/icons-material/GroupsOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";

const ProjectSubPageMenu = ({project}) => {
    const basePath = `/projects/list/${project?.id}`;

    const buildingSupervisionAreaSubmenuItems = [
        {
            to: `${basePath}/buildingcomponent`,
            text: "Componentes",
        },
        {
            to: `${basePath}/bcomponentanalysis`,
            text: "Análisis",
        },
    ];

    const socialSupervisionAreaSubmenuItems = [
        {
            to: `${basePath}/socialcomponent`,
            text: "Componentes",
        },
        {
            to: `${basePath}/scomponentanalysis`,
            text: "Análisis",
        },
        {
            to: `${basePath}/connections/${project?.id}`,
            text: "Conexiones",
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
                text="Contratos"
                icon={<WorkOutlineOutlinedIcon />}
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
                text="Plantel"
                icon={<PermContactCalendarIconOutlined />}
            />
            <SubPageMenuListItemButton
                key="project-fieldreport"
                to={`${basePath}/fieldreport`}
                text="Informes de viaje"
                icon={<DirectionsCarFilledOutlinedIcon />}
            />
            <SubPageMenuListGroup
                id="building_monitoring"
                headerTitle="Área técnica"
                headerIcon={<HandymanOutlinedIcon />}
                items={buildingSupervisionAreaSubmenuItems}
            />
            <SubPageMenuListGroup
                id="social_monitoring"
                headerTitle="Área social"
                headerIcon={<HandshakeOutlinedIcon />}
                items={socialSupervisionAreaSubmenuItems}
            />
            <QuestionnairesMenu
                questionnaires={project?.questionnaires}
                basePath={`/projects/list/${project?.id}`}
            />
        </SubPageMenu>
    );
};

export default ProjectSubPageMenu;
