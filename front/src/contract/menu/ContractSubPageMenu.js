import {useAuth} from "base/user/provider";
import {SubPageMenu, SubPageMenuListItemButton} from "base/ui/menu";
import {QuestionnairesMenu} from "questionnaire/presentational";
import {SelectContractDropDown} from "contract/menu";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";

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
                key="contract-contracting"
                to={`${basePath}/contracting`}
                text="Contratación"
                icon={<HandshakeOutlinedIcon />}
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
            <SubPageMenuListItemButton
                key="contract-payments"
                to={`${basePath}/payment`}
                text="Pagos"
                icon={<RequestQuoteOutlinedIcon />}
            />
            <QuestionnairesMenu
                questionnaires={contract.questionnaires}
                basePath={`/contracts/list/${contract?.id}`}
            />
        </SubPageMenu>
    );
};

export default ContractSubPageMenu;
