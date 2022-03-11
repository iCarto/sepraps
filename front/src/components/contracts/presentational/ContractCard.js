import {DateUtil, NumberUtil} from "utilities";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DateRangeIcon from "@mui/icons-material/DateRange";

const ContractCard = ({contract}) => {
    return (
        <Link href={`/contracts/${contract.id}`} underline="none" color="inherit">
            <Card id={contract.id} variant="outlined">
                <CardContent>
                    <Typography variant="h5" gutterBottom color="primary">
                        {contract.number}
                    </Typography>
                    <Typography variant="body2">
                        {contract.bid_request_number}
                    </Typography>
                </CardContent>
                <CardContent sx={{bgcolor: "grey.200"}}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1.75,
                        }}
                    >
                        <Tooltip title="Ubicación">
                            <AttachMoneyIcon fontSize="small" sx={{mr: 1}} />
                        </Tooltip>
                        <Typography variant="subtitle1" sx={{lineHeight: "normal"}}>
                            {NumberUtil.formatDecimal(contract.bid_request_budget)}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Tooltip title="Fecha de inicio">
                            <DateRangeIcon fontSize="small" sx={{mr: 1}} />
                        </Tooltip>
                        <Typography variant="subtitle1" sx={{lineHeight: 1}}>
                            {DateUtil.formatDateMonth(contract.bid_request_date)} (
                            {contract.bid_request_deadline} meses)
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ContractCard;
