import {useParams} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {SubPageMenu, PageMenuListItemButton} from "base/ui/menu";
import {QuestionnairesMenu} from "questionnaire/presentational";
import {ClosedProjectTag} from "project/presentational";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FlagIcon from "@mui/icons-material/Flag";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const ProjectSubPageMenu = ({project}) => {
    const {ROLES} = useAuth();
    const {id} = useParams();
    const basePath = `/projects/${id}`;

    return (
        <SubPageMenu
            headingPrimaryText={project?.name}
            headingSecondaryText={`Proyecto:`}
            headingTag={project?.closed ? <ClosedProjectTag /> : null}
        >
            <PageMenuListItemButton
                key="project-detail"
                to={`${basePath}/summary`}
                text="Resumen"
                icon={<InventoryRoundedIcon />}
            />
            <PageMenuListItemButton
                key="project-location"
                to={`${basePath}/location`}
                text="Ubicación"
                icon={<PinDropIcon />}
            />
            <PageMenuListItemButton
                key="project-financing"
                to={`${basePath}/financing`}
                text="Financiación"
                icon={<AccountBalanceIcon />}
            />
            <PageMenuListItemButton
                key="project-milestones"
                to={`${basePath}/milestones`}
                text="Hitos"
                icon={<FlagIcon />}
            />
            <PageMenuListItemButton
                key="project-documents"
                to={`${basePath}/documents`}
                text="Documentos"
                icon={<FolderOpenIcon />}
            />
            <PageMenuListItemButton
                key="project-contacts"
                to={`${basePath}/contacts`}
                text="Contactos"
                icon={<PermContactCalendarIcon />}
            />
            <QuestionnairesMenu
                questionnaires={project?.questionnaires}
                basePath={`/projects/${project?.id}`}
            />
        </SubPageMenu>
    );
};

export default ProjectSubPageMenu;
