import {useAuth} from "base/user/provider";
import {SubPageMenu, PageMenuListItemButton} from "base/ui/menu";
import {QuestionnairesMenu} from "questionnaire/presentational";
import {SelectContractDropDown} from "contract/menu";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import EventNoteIcon from "@mui/icons-material/EventNote";

const ContractSubPageMenu = ({contract}) => {
    const {ROLES} = useAuth();
    const basePath = `/contracts/${contract?.id}`;

    return (
        <SubPageMenu
            subPageMenuDropdown={<SelectContractDropDown contract={contract} />}
        >
            <PageMenuListItemButton
                key="contract-detail"
                to={`${basePath}/summary`}
                text="Resumen"
                icon={<InfoOutlinedIcon />}
            />
            <PageMenuListItemButton
                key="contract-phases"
                to={`${basePath}/phases`}
                text="Fases"
                icon={<EventNoteIcon />}
            />
            <PageMenuListItemButton
                key="contract-monitoring"
                to={`${basePath}/monitoring`}
                text="Supervisión"
                icon={<PermContactCalendarIcon />}
            />
            <PageMenuListItemButton
                key="contract-projects"
                to={`${basePath}/projects`}
                text="Proyectos"
                icon={<BallotOutlinedIcon />}
            />
            <QuestionnairesMenu
                questionnaires={contract.questionnaires}
                basePath={`/contracts/${contract?.id}`}
            />
        </SubPageMenu>
    );
};

export default ContractSubPageMenu;
