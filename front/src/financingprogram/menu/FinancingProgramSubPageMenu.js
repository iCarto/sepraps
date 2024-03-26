import {SubPageMenu, SubPageMenuListItemButton} from "base/ui/menu";
import {SelectFinancingProgramDropDown} from "financingprogram/container";

import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";

const FinancingProgramSubPageMenu = ({financingProgram}) => {
    const basePath = `/financingprograms/list/${financingProgram?.id}`;

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
        </SubPageMenu>
    );
};

export default FinancingProgramSubPageMenu;
