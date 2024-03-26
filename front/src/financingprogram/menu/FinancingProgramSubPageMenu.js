import {
    SubPageMenu,
    SubPageMenuListGroup,
    SubPageMenuListItemButton,
} from "base/ui/menu";
import {SelectFinancingProgramDropDown} from "financingprogram/container";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";

const FinancingProgramSubPageMenu = ({financingProgram}) => {
    const basePath = `/financingprograms/list/${financingProgram?.id}`;

    const buildingSupervisionAreaSubmenuItems = [
        {
            to: `${basePath}/buildingcomponents/overview`,
            text: "Construcción",
            urlSlug: "buildingcomponents",
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
            <SubPageMenuListGroup
                id="building-supervision"
                headerTitle="Área técnica"
                headerIcon={<HandymanOutlinedIcon />}
                items={buildingSupervisionAreaSubmenuItems}
            />
        </SubPageMenu>
    );
};

export default FinancingProgramSubPageMenu;
