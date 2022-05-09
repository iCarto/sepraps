import {DateUtil, NumberUtil} from "utilities";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

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
                        <Tooltip title="Fecha de inicio">
                            <DateRangeOutlinedIcon fontSize="small" />
                        </Tooltip>
                        <Typography variant="body2">
                            {DateUtil.formatDate(contract.awarding_date)} (
                            {contract.bid_request_deadline} meses)
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Tooltip title="Monto adjudicado">
                            <AttachMoneyOutlinedIcon fontSize="small" />
                        </Tooltip>
                        <Typography variant="body2">
                            {NumberUtil.formatCurrency(contract.awarding_budget)}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Tooltip title="Contratista">
                            <WorkOutlineOutlinedIcon fontSize="small" />
                        </Tooltip>
                        <Typography variant="body2">
                            {contract.contractor?.name}
                        </Typography>
                    </Stack>
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
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ContractCard;
