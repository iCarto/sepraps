import {DateUtil, NumberUtil} from "utilities";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const ContractCard = ({contract, onClick = null}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(contract.id);
        }
    };

    return (
        <Card
            id={contract.id}
            variant="outlined"
            onClick={handleClick}
            sx={{cursor: onClick ? "pointer" : "inherit"}}
        >
            <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                    {contract.number}
                </Typography>
                <Typography variant="body2">{contract.comments}</Typography>
            </CardContent>
            <CardContent sx={{bgcolor: "grey.100"}}>
                <Stack spacing={1}>
                    <Stack direction="row" spacing={2}>
                        <Tooltip title="Financiación">
                            <AccountBalanceOutlinedIcon fontSize="small" />
                        </Tooltip>
                        {contract.financing_program && (
                            <Typography variant="body2">
                                {contract.financing_program?.short_name}
                            </Typography>
                        )}
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Tooltip title="Plazo previsto de ejecución">
                            <DateRangeOutlinedIcon fontSize="small" />
                        </Tooltip>
                        <Typography variant="body2">
                            {contract.expected_execution_period} días
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Tooltip title="Fecha de adjudicación">
                            <EventOutlinedIcon fontSize="small" />
                        </Tooltip>
                        <Typography variant="body2">
                            {DateUtil.formatDate(contract.awarding_date)}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Tooltip title="Monto adjudicado">
                            <MonetizationOnOutlinedIcon fontSize="small" />
                        </Tooltip>
                        <Typography variant="body2">
                            {NumberUtil.formatCurrency(contract.awarding_budget)}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Tooltip title="Contratista">
                            <EngineeringOutlinedIcon fontSize="small" />
                        </Tooltip>
                        <Typography variant="body2">
                            {contract.contractor?.name}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ContractCard;
