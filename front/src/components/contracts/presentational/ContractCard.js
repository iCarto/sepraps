import {DateUtil, NumberUtil} from "utilities";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

const ContractCard = ({contract}) => {
    return (
        <Link href={`/contracts/${contract.id}`} underline="none" color="inherit">
            <Card id={contract.id} variant="outlined">
                <CardContent>
                    <Typography variant="h5" gutterBottom color="primary">
                        {contract.number}
                    </Typography>
                    <Typography variant="body1">
                        {contract.bid_request_number}
                    </Typography>
                </CardContent>
                <CardContent sx={{bgcolor: "grey.100"}}>
                    <Stack spacing={1}>
                        <Stack direction="row" spacing={2}>
                            <Tooltip title="Contratista">
                                <WorkOutlineOutlinedIcon fontSize="small" />
                            </Tooltip>
                            <Typography variant="body2">
                                {contract.contractor?.name}
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
                            <Tooltip title="Fecha de inicio">
                                <DateRangeOutlinedIcon fontSize="small" />
                            </Tooltip>
                            <Typography variant="body2">
                                {DateUtil.formatDate(contract.awarding_date)} (
                                {contract.bid_request_deadline} meses)
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ContractCard;
