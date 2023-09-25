import {useAuth} from "base/user/provider";
import {SubPageMenu, SubPageMenuListItemButton} from "base/ui/menu";
import {QuestionnairesMenu} from "questionnaire/presentational";
import {SelectContractDropDown} from "contract/menu";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";

const ContractSubPageMenu = ({contract}) => {
    const {ROLES} = useAuth();
    const basePath = `/contracts/list/${contract?.id}`;

    return (
        <SubPageMenu
            subPageMenuDropdown={<SelectContractDropDown contract={contract} />}
        >
            <SubPageMenuListItemButton
                key="contract-detail"
                to={`${basePath}/summary`}
                text="Resumen"
                icon={<InfoOutlinedIcon />}
            />
            <SubPageMenuListItemButton
                key="contract-phases"
                to={`${basePath}/phases`}
                text="Fases"
                icon={<EventNoteOutlinedIcon />}
            />
            <SubPageMenuListItemButton
                key="contract-monitoring"
                to={`${basePath}/monitoring`}
                text="Supervisión"
                icon={<PermContactCalendarOutlinedIcon />}
            />
            <SubPageMenuListItemButton
                key="contract-projects"
                to={`${basePath}/projects`}
                text="Proyectos"
                icon={<BallotOutlinedIcon />}
            />
            <QuestionnairesMenu
                questionnaires={contract.questionnaires}
                basePath={`/contracts/list/${contract?.id}`}
            />
        </SubPageMenu>
    );
};

export default ContractSubPageMenu;
