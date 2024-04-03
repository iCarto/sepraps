import {
    SubPageMenu,
    SubPageMenuListGroup,
    SubPageMenuListItemButton,
} from "base/ui/menu";
import {SelectProjectDropDown} from "project/menu";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FolderOpenIconOutlined from "@mui/icons-material/FolderOpenOutlined";
import GroupsIconOutlined from "@mui/icons-material/GroupsOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";

import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";
import {QuestionnairesMenu} from "questionnaire/presentational";

const ProjectSubPageMenu = ({project}) => {
    const basePath = `/projects/list/${project?.id}`;

    const buildingSupervisionAreaSubmenuItems = [
        {
            to: `${basePath}/buildingcomponents/overview`,
            text: "Construcción",
            urlSlug: "buildingcomponents",
        },
        {
            to: `${basePath}/certifications/overview`,
            text: "Certificaciones",
            urlSlug: "certifications",
        },
    ];

    const socialSupervisionAreaSubmenuItems = [
        {
            to: `${basePath}/socialcomponents/overview`,
            text: "Servicios",
            urlSlug: "socialcomponents",
        },
        {
            to: `${basePath}/connections/overview`,
            text: "Conexiones",
            urlSlug: "connections",
        },
    ];

    const generalAreaSubmenuItems = [
        {
            to: `${basePath}/fieldreport`,
            text: "Informes de viaje",
            urlSlug: "fieldreport",
        },
        {
            to: `${basePath}/milestones`,
            text: "Hitos",
            urlSlug: "milestones",
        },
        {
            to: `${basePath}/contacts`,
            text: "Plantel",
            urlSlug: "contacts",
        },
    ];

    return (
        <SubPageMenu subPageMenuDropdown={<SelectProjectDropDown project={project} />}>
            <SubPageMenuListItemButton
                key="project-detail"
                to={`${basePath}/summary`}
                text="Resumen"
                icon={<InfoOutlinedIcon />}
            />
            <SubPageMenuListItemButton
                key="project-location"
                to={`${basePath}/location`}
                text="Localización"
                icon={<GroupsIconOutlined />}
            />
            <SubPageMenuListItemButton
                key="project-documents"
                to={`${basePath}/documents`}
                text="Documentos"
                icon={<FolderOpenIconOutlined />}
            />
            <SubPageMenuListGroup
                id="building-supervision"
                headerTitle="Área técnica"
                headerIcon={<HandymanOutlinedIcon />}
                items={buildingSupervisionAreaSubmenuItems}
            />
            <SubPageMenuListGroup
                id="socialcomponents"
                headerTitle="Área social"
                headerIcon={<HandshakeOutlinedIcon />}
                items={socialSupervisionAreaSubmenuItems}
            />
            <SubPageMenuListGroup
                id="general"
                headerTitle="Área general"
                headerIcon={<ChromeReaderModeOutlinedIcon />}
                items={generalAreaSubmenuItems}
            />
            <QuestionnairesMenu
                questionnaires={project?.questionnaires}
                basePath={`/projects/list/${project?.id}`}
            />
        </SubPageMenu>
    );
};

export default ProjectSubPageMenu;
