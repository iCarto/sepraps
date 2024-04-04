import {
    SubPageMenu,
    SubPageMenuListGroup,
    SubPageMenuListItemButton,
} from "base/ui/menu";
import {SelectFinancingProgramDropDown} from "financingprogram/container";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";

const FinancingProgramSubPageMenu = ({financingProgram}) => {
    const basePath = `/financingprograms/list/${financingProgram?.id}`;

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
                icon={<InfoOutlinedIcon />}
            />
            <SubPageMenuListItemButton
                key="financingprogram-projects"
                to={`${basePath}/projects`}
                text="Proyectos"
                icon={<BallotOutlinedIcon />}
            />
            <SubPageMenuListItemButton
                key="financingprogram-payments"
                to={`${basePath}/payments`}
                text="Productos"
                icon={<RequestQuoteOutlinedIcon />}
            />
            <SubPageMenuListGroup
                id="financingprogram-building-supervision"
                headerTitle="Área técnica"
                headerIcon={<HandymanOutlinedIcon />}
                items={buildingSupervisionAreaSubmenuItems}
            />
            <SubPageMenuListGroup
                id="financingprogram-social-supervision"
                headerTitle="Área social"
                headerIcon={<HandshakeOutlinedIcon />}
                items={socialSupervisionAreaSubmenuItems}
            />
        </SubPageMenu>
    );
};

export default FinancingProgramSubPageMenu;
