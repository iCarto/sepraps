import {SUPERVISION_AREAS} from "contract/model";

import {useAuth} from "base/user/provider";
import {
    SubPageMenu,
    SubPageMenuListGroup,
    SubPageMenuListItemButton,
} from "base/ui/menu";
import {SelectContractDropDown} from "contract/menu";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";

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
            to: `${basePath}/buildingcomponents/overview`,
            text: "Construcción",
            urlSlug: "buildingcomponents",
        },
        {
            to: `${basePath}/certifications/analysis`,
            text: "Certificaciones",
            urlSlug: "certifications",
        },
    ];

    const socialSupervisionAreaSubmenuItems = [
        {
            to: `${basePath}/trainings/overview`,
            text: "Servicios",
            urlSlug: "trainings",
        },
        {
            to: `${basePath}/connections/overview`,
            text: "Conexiones",
            urlSlug: "connections",
        },
    ];

    const generalAreaSubmenuItems = [
        {
            to: `${basePath}/contacts`,
            text: "Plantel",
            urlSlug: "contacts",
        },
    ];

    return (
        <SubPageMenu
            subPageMenuDropdown={<SelectContractDropDown contract={contract} />}
        >
            <SubPageMenuListItemButton
                key="contract-summary"
                to={`${basePath}/summary`}
                text="Resumen"
                icon={<InfoOutlinedIcon />}
            />
            <SubPageMenuListItemButton
                key="contract-info"
                to={`${basePath}/info`}
                text="Información general"
                icon={<InventoryRoundedIcon />}
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
            <SubPageMenuListGroup
                id="building_supervision_area"
                headerTitle="Área Técnica"
                headerIcon={<HandymanOutlinedIcon />}
                items={buildingSupervisionAreaSubmenuItems}
            />
            <SubPageMenuListGroup
                id="social_supervision_area"
                headerTitle="Área Social"
                headerIcon={<HandshakeOutlinedIcon />}
                items={socialSupervisionAreaSubmenuItems}
            />
            <SubPageMenuListGroup
                id="general"
                headerTitle="Área general"
                headerIcon={<ChromeReaderModeOutlinedIcon />}
                items={generalAreaSubmenuItems}
            />
        </SubPageMenu>
    );
};

export default ContractSubPageMenu;
