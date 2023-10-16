import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {PaymentService} from "payment/service";
import {ViewOrUpdatePaymentDataContent} from ".";
import {ViewPaymentProductsContent} from "product/container";
import Stack from "@mui/system/Stack";
import {ViewPaymentCommentsContent} from "comment/container";
import Box from "@mui/material/Box";
import {SidebarPanelDrawer} from "base/ui/sidebar";
import {Outlet} from "react-router-dom";
import styled from "@mui/material/styles/styled";
import {SIDEBAR_PANEL_DRAWER_WIDTH} from "base/ui/app/config/measurements";

const PageContainer = styled("div", {shouldForwardProp: prop => prop !== "open"})(
    ({theme, open}) => ({
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: 0,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: SIDEBAR_PANEL_DRAWER_WIDTH - 240,
        }),
    })
);

const ViewPaymentContent = () => {
    const [isSidebarPanelOpen, setSidebarPanelOpen] = useState(false);

    const {paymentId} = useParams();
    const [payment, setPayment] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setPayment(null);
        PaymentService.get(paymentId).then(data => {
            setPayment(data);
        });
    }, [paymentId, location.state?.lastRefreshDate]);

    return (
        payment && (
            <PageContainer open={isSidebarPanelOpen}>
                <Stack spacing={1}>
                    <ViewOrUpdatePaymentDataContent
                        contractId={payment.contract}
                        payment={payment}
                    />
                    <ViewPaymentProductsContent payment={payment} />
                    <ViewPaymentCommentsContent payment={payment} />
                </Stack>
                <SidebarPanelDrawer isSidebarPanelOpen={isSidebarPanelOpen}>
                    <Outlet context={[setSidebarPanelOpen]} />
                </SidebarPanelDrawer>
            </PageContainer>
        )
    );
};

export default ViewPaymentContent;
