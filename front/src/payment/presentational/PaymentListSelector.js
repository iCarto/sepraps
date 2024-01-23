import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

import {PaymentListSelectorItem} from ".";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Box from "@mui/material/Box";

const PaymentListSelector = ({payments, selectedPaymentId, basePath}) => {
    const navigate = useNavigate();
    const [paymentsList, setPaymentsList] = useState([]);

    useEffect(() => {
        setPaymentsList(payments);
    }, [payments]);

    return (
        <Box
            sx={{
                ml: 1,
                p: 1,
                backgroundColor: "grey.50",
                borderRadius: 1,
            }}
        >
            <Grid container justifyContent="space-around" alignItems="center">
                <Typography color="primary.main" sx={{textTransform: "uppercase"}}>
                    Productos
                </Typography>
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
                        title="Añadir nuevo producto"
                    >
                        <AddCircleOutlineOutlinedIcon fontSize="inherit" />
                    </Tooltip>
                </IconButton>
            </Grid>
            <List
                sx={{
                    border: 1,
                    borderColor: "grey.400",
                    backgroundColor: "grey.300",
                    borderRadius: 1,
                    maxHeight: "600px",
                    overflow: "auto",
                }}
            >
                {paymentsList &&
                    paymentsList.map((payment, index) => (
                        <>
                            {index != 0 && <Divider />}
                            <PaymentListSelectorItem
                                key={payment.id}
                                payment={payment}
                                to={`${basePath}/${payment.id.toString()}`}
                                selected={selectedPaymentId === payment.id}
                            />
                        </>
                    ))}
            </List>
        </Box>
    );
};

export default PaymentListSelector;
