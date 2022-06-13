import {PageLayout} from "layout";
import {SectionCard, SmallIconCard} from "components/common/presentational";
import {RecentProjectsList} from "components/project/presentational";
import {RecentContractsList} from "components/contracts/presentational";
import {ComingEventsWidget, NotificationsWidget} from ".";

import Grid from "@mui/material/Grid";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

const ViewHomePage = () => {
    const dummyDataForRecentProjects = [
        {
            name: "Pisadera",
            code: "2019-AP-001",
            featured_image:
                "https://cdn.pixabay.com/photo/2016/11/22/07/26/indiana-dunes-state-park-1848559_960_720.jpg",
        },
        {
            name: "Candelaria",
            code: "2019-AP-002",
            featured_image:
                "https://cdn.pixabay.com/photo/2011/01/17/17/59/landscape-arch-4608_960_720.jpg",
        },
        {
            name: "Ykua Pora",
            code: "2019-AP-006",
            featured_image:
                "https://cdn.pixabay.com/photo/2018/04/20/07/12/alaska-3335260_960_720.jpg",
        },
    ];

    const dummyDataForRecentContracts = [
        {
            code: "14/2019",
            financing_fund: "BID",
        },
        {
            code: "20/2019",
            financing_fund: "BID",
        },
        {
            code: "24/2019",
            financing_fund: "MERCOSUR",
        },
    ];

    const dummyDataForNotifications = [
        {
            name: "Proyecto Pisadera - 2019-AP-014",
            notificationDate: "13-06-2022",
            notificationMessage:
                "No se han introducido datos en la certificación presupuestaria de este mes",
            notificationColor: "error",
        },
        {
            name: "Proyecto Ykua Pora - 2019-AP-003",
            notificationDate: "15-06-2022",
            notificationMessage:
                "No se han introducido datos en la certificación presupuestaria de este mes",
            notificationColor: "error",
        },
        {
            name: "Contrato 20/2019",
            notificationDate: "16-06-2022",
            notificationMessage:
                "Ya se han recibido todos los sitios de obra vinculados a este contrato",
            notificationColor: "success",
        },
        {
            name: "Contrato 14/2019",
            notificationDate: "16-06-2022",
            notificationMessage:
                "El periodo de garantía de este contrato finalizará dentro de 25 días",
            notificationColor: "warning",
        },
    ];

    const dummyDataForComingEvents = [
        {
            date: "2022-06-25",
            day: "25",
            month: "JUN",
            linked_entity: "Contrato 20/2019",
            eventMessage:
                "El periodo de garantía de este contrato finalizará dentro de 11 días",
        },
        {
            date: "2022-06-26",
            day: "26",
            month: "JUN",
            linked_entity: "Contrato 19/2019",
            eventMessage:
                "El plazo previsto de terminación de este contrato finalizará dentro de 12 días",
        },
        {
            date: "2022-06-30",
            day: "30",
            month: "JUN",
            linked_entity: "Contrato 03/2019",
            eventMessage:
                "El periodo de garantía de este contrato finalizará dentro de 16 días",
        },
    ];

    return (
        <PageLayout>
            <Grid container sx={{mb: 4}} spacing={3} justifyContent="space-between">
                <Grid
                    item
                    container
                    xs={12}
                    md={6}
                    lg={5}
                    spacing={3}
                    alignContent="flex-start"
                >
                    <Grid item xs={6}>
                        <SmallIconCard
                            heading="Contratos"
                            figureContent="3"
                            urlPath="/contracts"
                            icon={
                                <WorkOutlineOutlinedIcon
                                    sx={{fontSize: "60px", lineHeight: 0}}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <SmallIconCard
                            heading="Proyectos"
                            figureContent="23"
                            urlPath="/projects"
                            icon={
                                <FactCheckOutlinedIcon
                                    sx={{fontSize: "60px", lineHeight: 0}}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SectionCard
                            title="Últimas modificaciones"
                            headingLabel={false}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <RecentContractsList
                                        contracts={dummyDataForRecentContracts}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <RecentProjectsList
                                        projects={dummyDataForRecentProjects}
                                    />
                                </Grid>
                            </Grid>
                        </SectionCard>
                    </Grid>
                </Grid>
                <Grid item container xs={12} md={6} lg={7} spacing={3}>
                    <Grid item xs={12}>
                        <NotificationsWidget
                            notifications={dummyDataForNotifications}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ComingEventsWidget events={dummyDataForComingEvents} />
                    </Grid>
                </Grid>
            </Grid>
        </PageLayout>
    );
};

export default ViewHomePage;
