import {useEffect, useMemo, useState} from "react";
import {ContractService, NotificationService, ProjectService} from "service/api";

import {PageLayout} from "layout";
import {SectionCard, SmallIconCard} from "components/common/presentational";
import {RecentProjectsList} from "components/project/presentational";
import {RecentContractsList} from "components/contracts/presentational";
import {ComingEventsWidget, NotificationsWidget} from ".";

import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

const ViewHomePage = () => {
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

    const [projects, setProjects] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    //TO-DO: FIX
    const fakeFilter = {status: "active"};

    useEffect(() => {
        setLoading(true);
        ProjectService.getProjects(fakeFilter).then(data => {
            setProjects(data.sort((a, b) => b.updated_at - a.updated_at));
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        ContractService.getContracts(false).then(data => {
            setContracts(data.sort((a, b) => b.updated_at - a.updated_at));
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        NotificationService.getNotifications().then(data => {
            setNotifications(data);
        });
    }, []);

    const latestContracts = useMemo(() => contracts.slice(0, 3), [contracts]);
    const latestProjects = useMemo(() => projects.slice(0, 3), [projects]);

    return (
        <PageLayout>
            {loading ? (
                <Grid container justifyContent="center" my={6}>
                    <CircularProgress size={40} />
                </Grid>
            ) : (
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
                                figureContent={contracts.length}
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
                                figureContent={projects.length}
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
                                            contracts={latestContracts}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <RecentProjectsList projects={latestProjects} />
                                    </Grid>
                                </Grid>
                            </SectionCard>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={6} lg={7} spacing={3}>
                        <Grid item xs={12}>
                            <NotificationsWidget notifications={notifications} />
                        </Grid>
                        <Grid item xs={12}>
                            <ComingEventsWidget events={dummyDataForComingEvents} />
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </PageLayout>
    );
};

export default ViewHomePage;
