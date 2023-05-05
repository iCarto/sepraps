import {DateUtil} from "base/format/utilities";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

export function useProjectCard() {
    const cardFields = [
        {
            label: "Ubicación",
            icon: <LocationOnOutlinedIcon fontSize="small" />,
            formatFunction: element => {
                return element.location;
            },
        },
        {
            label: "Fecha de inicio",
            icon: <DateRangeOutlinedIcon fontSize="small" />,
            formatFunction: element => {
                return DateUtil.formatDate(element.init_date);
            },
        },
        {
            label: "Contrato",
            icon: <WorkOutlineOutlinedIcon fontSize="small" />,
            formatFunction: element => {
                return (
                    element.construction_contract_number ||
                    element.construction_contract?.bid_request_number
                );
            },
        },
        {
            label: "Programa de financiación",
            icon: <AccountBalanceOutlinedIcon fontSize="small" />,
            formatFunction: element => {
                return (
                    element.financing_program_name ||
                    element.construction_contract?.financing_program?.short_name
                );
            },
        },
        {
            label: "Trabajos",
            icon: <AssignmentOutlinedIcon fontSize="small" />,
            formatFunction: element => {
                return element.description;
            },
        },
    ];

    return {cardFields};
}
