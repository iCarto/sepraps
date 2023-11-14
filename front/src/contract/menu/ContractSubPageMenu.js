import {SUPERVISION_AREAS} from "contract/model";

import {useAuth} from "base/user/provider";
import {
    SubPageMenu,
    SubPageMenuListGroup,
    SubPageMenuListItemButton,
} from "base/ui/menu";
import {QuestionnairesMenu} from "questionnaire/presentational";
import {SelectContractDropDown} from "contract/menu";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

const ContractSubPageMenu = ({contract}) => {
    const {ROLES} = useAuth();
    const basePath = `/contracts/list/${contract?.id}`;

    const phasesSubmenuItems = [
        {
            to: `${basePath}/budget`,
            text: "Licitación",
        },
        {
            to: `${basePath}/awarding`,
            text: "Adjudicación",
        },
        {
            to: `${basePath}/execution`,
            text: "Ejecución",
        },
    ];

    const buildingSupervisionAreaSubmenuItems = [
        {
            to: `${basePath}/building`,
            text: "Supervisión",
        },
    ];

    const socialSupervisionAreaSubmenuItems = [
        {
            to: `${basePath}/social`,
            text: "Supervisión",
        },
    ];

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
            <SubPageMenuListGroup
                headerTitle="Fases"
                headerIcon={<ListAltOutlinedIcon />}
                items={phasesSubmenuItems}
                expanded={true}
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
            {contract?.supervision_areas?.includes(SUPERVISION_AREAS.BUILDING) && (
                <SubPageMenuListGroup
                    headerTitle="Área Técnica"
                    headerIcon={<EngineeringOutlinedIcon />}
                    items={buildingSupervisionAreaSubmenuItems}
                    expanded={true}
                />
            )}
            {contract?.supervision_areas?.includes(SUPERVISION_AREAS.SOCIAL) && (
                <SubPageMenuListGroup
                    headerTitle="Área Social"
                    headerIcon={<GroupsOutlinedIcon />}
                    items={socialSupervisionAreaSubmenuItems}
                    expanded={true}
                />
            )}
            <QuestionnairesMenu
                questionnaires={contract.questionnaires}
                basePath={`/contracts/list/${contract?.id}`}
            />
        </SubPageMenu>
    );
};

export default ContractSubPageMenu;
