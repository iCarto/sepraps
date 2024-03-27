import {
    SubPageMenu,
    SubPageMenuListGroup,
    SubPageMenuListItemButton,
} from "base/ui/menu";
import {SelectFinancingProgramDropDown} from "financingprogram/container";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";

const FinancingProgramSubPageMenu = ({financingProgram}) => {
    const basePath = `/financingprograms/list/${financingProgram?.id}`;

    const buildingSupervisionAreaSubmenuItems = [
        {
            to: `${basePath}/buildingcomponents/overview`,
            text: "Construcción",
            urlSlug: "buildingcomponents",
        },
    ];

    const socialSupervisionAreaSubmenuItems = [
        {
            to: `${basePath}/trainings/overview`,
            text: "Capacitaciones",
            urlSlug: "trainings",
        },
        {
            to: `${basePath}/connections/overview`,
            text: "Conexiones",
            urlSlug: "connections",
        },
    ];

    return (
        <SubPageMenu
            subPageMenuDropdown={
                <SelectFinancingProgramDropDown financingProgram={financingProgram} />
            }
        >
            <SubPageMenuListItemButton
                key="financingprogram-detail"
                to={`${basePath}/summary`}
                text="Resumen"
                icon={<InventoryRoundedIcon />}
            />
            <SubPageMenuListItemButton
                key="contract-payments"
                to={`${basePath}/payments`}
                text="Productos"
                icon={<RequestQuoteOutlinedIcon />}
            />
            <SubPageMenuListGroup
                id="building-supervision"
                headerTitle="Área técnica"
                headerIcon={<HandymanOutlinedIcon />}
                items={buildingSupervisionAreaSubmenuItems}
            />
            <SubPageMenuListGroup
                id="social-supervision"
                headerTitle="Área social"
                headerIcon={<HandshakeOutlinedIcon />}
                items={socialSupervisionAreaSubmenuItems}
            />
        </SubPageMenu>
    );
};

export default FinancingProgramSubPageMenu;
