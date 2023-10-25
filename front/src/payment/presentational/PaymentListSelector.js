import {styled} from "@mui/material/styles";
import {TextLink} from "base/navigation/components";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {useNavigate} from "react-router";
import {PaymentListSelectorItem} from ".";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const PaymentListSelector = ({payments, selectedPaymentId, basePath}) => {
    const navigate = useNavigate();
    const [paymentsList, setPaymentsList] = useState([]);

    useEffect(() => {
        setPaymentsList(payments);
    }, [payments]);

    return (
        <Paper
            sx={{
                border: "1px",
                borderStyle: "solid",
                borderColor: "darkgray",
                p: 1,
                height: "calc(100vh - 180px)",
                overflow: "auto",
            }}
        >
            <Grid container justifyContent="space-around" alignItems="center">
                <Typography>Lista de pagos</Typography>
                <IconButton
                    aria-label="add-new-payment-button"
                    color="primary"
                    size="large"
                    onClick={() => {
                        navigate(`${basePath}/new`);
                    }}
                >
                    <Tooltip
                        id="add-new-payment-button-tooltip"
                        title="Añadir nuevo pago"
                    >
                        <AddCircleOutlineOutlinedIcon fontSize="inherit" />
                    </Tooltip>
                </IconButton>
            </Grid>
            <Divider />
            <List>
                {paymentsList &&
                    paymentsList.map(payment => (
                        <PaymentListSelectorItem
                            key={payment.id}
                            payment={payment}
                            to={`${basePath}/${payment.id.toString()}`}
                            selected={selectedPaymentId === payment.id}
                        />
                    ))}
            </List>
        </Paper>
    );
};

export default PaymentListSelector;
