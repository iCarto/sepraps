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
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router";

const CardContentNoPadding = styled(CardContent)(`
  padding: 3px 10px;
  &:last-child {
    padding-bottom: 0;
  }
`);

const PaymentList = ({payments, selectedPaymentId, basePath}) => {
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
            <Typography sx={{textAlign: "center"}}>Nombre del pago</Typography>
            <Divider />
            <Grid container direction="column" spacing={1} sx={{mt: 1}}>
                {paymentsList &&
                    paymentsList.map(payment => (
                        <Grid key={payment.id} item>
                            <Card
                                elevation={3}
                                sx={{
                                    border: "1px",
                                    borderStyle:
                                        selectedPaymentId === payment.id
                                            ? "solid"
                                            : "none",
                                    borderColor: "#ccc",
                                    backgroundColor:
                                        selectedPaymentId === payment.id
                                            ? "secondary.lighter"
                                            : "inherit",
                                    p: 1,
                                    textAlign: "center",
                                }}
                            >
                                <CardContentNoPadding>
                                    <TextLink
                                        text={payment.name}
                                        to={`${basePath}/${payment.id.toString()}`}
                                        textStyle={{
                                            fontWeight:
                                                selectedPaymentId === payment.id
                                                    ? "bold"
                                                    : "inherit",
                                        }}
                                    />
                                </CardContentNoPadding>
                            </Card>
                        </Grid>
                    ))}
                <Grid key="new" item alignSelf="center">
                    <IconButton
                        aria-label="delete"
                        size="large"
                        color="primary"
                        onClick={() => {
                            navigate(`${basePath}/new`);
                        }}
                    >
                        <AddIcon fontSize="inherit" />
                    </IconButton>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PaymentList;
