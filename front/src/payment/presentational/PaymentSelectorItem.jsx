import {DateUtil} from "base/format/utilities";
import {ListSelectorItem} from "base/shared/components";
import {getStatusIcon} from "./PaymentStatusChip";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";

const PaymentSelectorItem = ({
    payment,
    currentPaymentId,
    basePath,
    paymentIdsWithNotifications,
}) => {
    const paymentHasNotification = paymentIdsWithNotifications.includes(payment.id);

    const getIcon = () => {
        if (paymentHasNotification)
            return (
                <Tooltip title="Este producto tiene una incidencia por resolver">
                    <Badge color="error" variant="dot" overlap="circular">
                        {getStatusIcon(payment.status)}
                    </Badge>
                </Tooltip>
            );
        return getStatusIcon(payment.status);
    };

    return (
        <ListSelectorItem
            key={payment.id}
            heading={payment.name}
            subHeading={
                payment.approval_date || payment.expected_approval_date
                    ? `(${DateUtil.formatDate(
                          payment.approval_date
                              ? payment.approval_date
                              : payment.expected_approval_date
                      )})`
                    : "-"
            }
            icon={getIcon()}
            to={`${basePath}/${payment.id}`}
            selected={parseInt(currentPaymentId) === payment.id}
        />
    );
};

export default PaymentSelectorItem;
