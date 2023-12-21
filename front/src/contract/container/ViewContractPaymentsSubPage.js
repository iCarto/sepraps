import {useEffect, useState} from "react";
import {
    Outlet,
    useLocation,
    useNavigate,
    useOutletContext,
    useParams,
} from "react-router-dom";

import {ContractService} from "contract/service";
import {AlertError} from "base/error/components";
import {PaperContainer} from "base/shared/components";
import {PaymentListSelector} from "payment/presentational";
import {ViewPaymentFinancialChart} from "payment/container";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const ViewContractPaymentsSubPage = () => {
    const navigate = useNavigate();
    const {id: contractId, paymentId} = useParams();
    const location = useLocation();
    const isRootPath = location.pathname.split("/").slice(-1)[0] === "payment";

    const [contract] = useOutletContext();

    const [tabIndex, setTabIndex] = useState(0);
    const [error, setError] = useState(null);
    const [paymentsForContract, setPaymentsForContract] = useState(null);

    useEffect(() => {
        if (!paymentsForContract) {
            ContractService.getPaymentsList(contractId)
                .then(payments => {
                    setPaymentsForContract(payments);
                    if (isRootPath && payments.length > 0) {
                        navigate(payments[0].id.toString());
                    }
                })
                .catch(error => {
                    console.log({error});
                    setError(error);
                });
        }
    }, [contractId]);

    const handleChangeTab = (event, newTab) => {
        setTabIndex(newTab);
    };

    return (
        <PaperContainer>
            <AlertError error={error} />
            {!contract.awarding_budget ? (
                <Grid container justifyContent="center" my={6}>
                    <Typography
                        sx={{
                            fontStyle: "italic",
                            textAlign: "center",
                        }}
                    >
                        No se pueden gestionar los productos porque el contrato no tiene
                        monto adjudicado todavía
                    </Typography>
                </Grid>
            ) : (
                <Box>
                    <Tabs
                        value={tabIndex}
                        onChange={handleChangeTab}
                        aria-label="payment tabs"
                    >
                        <Tab label="Pagos" {...a11yProps(0)} />
                        <Tab label="Análisis" {...a11yProps(1)} />
                    </Tabs>
                    <Divider />
                    <TabPanel value={tabIndex} index={0}>
                        <Grid container>
                            <Box sx={{p: 1, width: "calc(100% - 240px)"}}>
                                <Outlet context={[contract]} />
                                {isRootPath &&
                                    paymentsForContract &&
                                    paymentsForContract.length === 0 && (
                                        <PaperContainer>
                                            <Grid
                                                container
                                                justifyContent="center"
                                                my={6}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontStyle: "italic",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    No se han registrado productos para
                                                    este contrato todavía
                                                </Typography>
                                            </Grid>
                                        </PaperContainer>
                                    )}
                            </Box>
                            <Box sx={{p: 1, width: "240px"}}>
                                <PaymentListSelector
                                    payments={paymentsForContract}
                                    basePath={`/contracts/list/${contractId}/payment`}
                                    selectedPaymentId={parseInt(paymentId)}
                                />
                            </Box>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>
                        <ViewPaymentFinancialChart filter={{contract: contract.id}} />
                    </TabPanel>
                </Box>
            )}
        </PaperContainer>
    );
};

export default ViewContractPaymentsSubPage;
