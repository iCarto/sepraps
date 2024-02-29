import {SUPERVISION_AREAS} from "contract/model";

import {useAuth} from "base/user/provider";
import {
    SubPageMenu,
    SubPageMenuListGroup,
    SubPageMenuListItemButton,
} from "base/ui/menu";
import {SelectContractDropDown} from "contract/menu";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";

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
        {
            to: `${basePath}/post-execution`,
            text: "Post-construcción",
        },
    ];

    const buildingSupervisionAreaSubmenuItems = [
        {
            to: `${basePath}/building_staff`,
            text: "Plantel",
        },
        {
            to: `${basePath}/project_analysis/overview`,
            text: "Análisis de proyectos",
        },
    ];

    const socialSupervisionAreaSubmenuItems = [
        {
            to: `${basePath}/social_staff`,
            text: "Plantel",
        },
        {
            to: `${basePath}/project_social_analysis/overview`,
            text: "Análisis de proyectos",
        },
    ];

    const contractSupervisionAreas = contract?.supervision_areas
        ? contract?.supervision_areas?.map(supervisionArea => supervisionArea.area)
        : [];

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
                id="phases"
                headerTitle="Fases"
                headerIcon={<ListAltOutlinedIcon />}
                items={phasesSubmenuItems}
            />
            <SubPageMenuListItemButton
                key="contract-projects"
                to={`${basePath}/projects`}
                text="Proyectos"
                icon={<BallotOutlinedIcon />}
            />
            <SubPageMenuListItemButton
                key="contract-payments"
                to={`${basePath}/payment/overview`}
                resolvedPathName={`${basePath}/payment`}
                text="Productos"
                icon={<RequestQuoteOutlinedIcon />}
            />
            {contractSupervisionAreas.includes(SUPERVISION_AREAS.BUILDING) && (
                <SubPageMenuListGroup
                    id="building_supervision_area"
                    headerTitle="Área Técnica"
                    headerIcon={<HandymanOutlinedIcon />}
                    items={buildingSupervisionAreaSubmenuItems}
                />
            )}
            {contractSupervisionAreas.includes(SUPERVISION_AREAS.SOCIAL) && (
                <SubPageMenuListGroup
                    id="social_supervision_area"
                    headerTitle="Área Social"
                    headerIcon={<HandshakeOutlinedIcon />}
                    items={socialSupervisionAreaSubmenuItems}
                />
            )}
        </SubPageMenu>
    );
};

export default ContractSubPageMenu;
