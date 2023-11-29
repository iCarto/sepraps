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
            to: `${basePath}/building_staff`,
            text: "Plantel",
        },
        {
            to: `${basePath}/project_analysis`,
            text: "Análisis de proyectos",
        },
    ];

    const socialSupervisionAreaSubmenuItems = [
        {
            to: `${basePath}/social_staff`,
            text: "Plantel",
        },
        {
            to: `${basePath}/project_social_analysis`,
            text: "Análisis de proyectos",
        },
    ];

    const contractSupervisionAreas = contract?.supervision_areas
        ? contract?.supervision_areas?.map(supervisionArea => supervisionArea.area)
        : [];
    console.log({contractSupervisionAreas});

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
            {contractSupervisionAreas.includes(SUPERVISION_AREAS.BUILDING) && (
                <SubPageMenuListGroup
                    headerTitle="Área Técnica"
                    headerIcon={<EngineeringOutlinedIcon />}
                    items={buildingSupervisionAreaSubmenuItems}
                    expanded={true}
                />
            )}
            {contractSupervisionAreas.includes(SUPERVISION_AREAS.SOCIAL) && (
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
