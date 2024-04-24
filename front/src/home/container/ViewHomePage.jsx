import {useEffect, useState} from "react";

import {ContractService} from "contract/service";
import {ProjectService} from "project/service";
import {ProviderService} from "provider/service";
import {StatsService} from "stats/service";
import {NotificationService} from "notification/service";
import {EventService} from "event/service";

import {LatestContractsList} from "contract/presentational";
import {LatestProjectsList} from "project/presentational";
import {PageLayout} from "base/ui/main";
import {LightHeading} from "base/ui/headings/components";
import {NotificationsWidget} from "notification/presentational";
import {ComingEventsWidget} from "event/presentational";
import {ContainerGridWithBorder} from "base/ui/section/components";
import {PaperComponent, SmallIconCard, Spinner} from "base/shared/components";
import {StatsByPhaseChart} from "stats/presentational";
import {LatestProvidersList} from "provider/presentational";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import CasesOutlinedIcon from "@mui/icons-material/CasesOutlined";
import GroupsIconOutlined from "@mui/icons-material/GroupsOutlined";

const ViewHomePage = () => {
    const [projects, setProjects] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [providers, setProviders] = useState([]);
    const [projectsNumber, setProjectsNumber] = useState(null);
    const [contractsNumber, setContractsNumber] = useState(null);
    const [providersNumber, setProvidersNumber] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [events, setEvents] = useState([]);
    const [statsByPhaseData, setStatsByPhaseData] = useState([]);

    const [projectsLoaded, setProjectsLoaded] = useState(false);
    const [contractsLoaded, setContractsLoaded] = useState(false);
    const [providersLoaded, setProvidersLoaded] = useState(false);
    const [numbersLoaded, setNumbersLoaded] = useState(false);
    const [notificationsLoaded, setNotificationsLoaded] = useState(false);
    const [eventsLoaded, setEventsLoaded] = useState(false);
    const [statsByPhaseDataLoaded, setStatsByPhaseDataLoaded] = useState(false);

    useEffect(() => {
        StatsService.getStatsForProjectsContractsAndProviders().then(data => {
            setProjectsNumber(data.find(item => item.name === "opened_projects").total);
            setContractsNumber(
                data.find(item => item.name === "opened_contracts").total
            );
            setProvidersNumber(
                data.find(item => item.name === "total_providers").total
            );
            setNumbersLoaded(true);
        });
        ProjectService.getList({page: 1, last_modified_items: 3}).then(data => {
            setProjects(data.results.sort((a, b) => b.updated_at - a.updated_at));
            setProjectsLoaded(true);
        });
        ContractService.getList({page: 1, last_modified_items: 3}).then(data => {
            setContracts(data.results.sort((a, b) => b.updated_at - a.updated_at));
            setContractsLoaded(true);
        });
        ProviderService.getList({page: 1, last_modified_items: 3}).then(data => {
            setProviders(data.results.sort((a, b) => b.updated_at - a.updated_at));
            setProvidersLoaded(true);
        });
        NotificationService.get().then(data => {
            setNotifications(data);
            setNotificationsLoaded(true);
        });
        EventService.getEvents().then(data => {
            setEvents(data.sort((a, b) => a.date - b.date));
            setEventsLoaded(true);
        });
        StatsService.getStatsByPhase().then(data => {
            data.sort((a, b) =>
                a.phase_name > b.phase_name ? 1 : b.phase_name > a.phase_name ? -1 : 0
            );
            setStatsByPhaseData(data);
            setStatsByPhaseDataLoaded(true);
        });
    }, []);

    return (
        <PageLayout style={{padding: "1rem"}}>
            <Grid container spacing={2} justifyContent="space-between">
                <Grid
                    item
                    container
                    xs={12}
                    lg={6}
                    spacing={2}
                    alignContent="flex-start"
                >
                    <Grid item container xs={4}>
                        <PaperComponent>
                            {numbersLoaded ? (
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <SmallIconCard
                                            heading="Contratos"
                                            figureContent={contractsNumber}
                                            urlPath="/contracts"
                                            icon={
                                                <CasesOutlinedIcon
                                                    sx={{
                                                        fontSize: "40px",
                                                        lineHeight: 0,
                                                    }}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SmallIconCard
                                            heading="Proyectos"
                                            figureContent={projectsNumber}
                                            urlPath="/projects"
                                            icon={
                                                <BallotOutlinedIcon
                                                    sx={{
                                                        fontSize: "40px",
                                                        lineHeight: 0,
                                                    }}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SmallIconCard
                                            heading="Prestadores"
                                            figureContent={providersNumber}
                                            urlPath="/providers"
                                            icon={
                                                <GroupsIconOutlined
                                                    sx={{
                                                        fontSize: "40px",
                                                        lineHeight: 0,
                                                    }}
                                                />
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            ) : (
                                <Spinner />
                            )}
                        </PaperComponent>
                    </Grid>
                    <Grid item container xs={8}>
                        <PaperComponent>
                            {statsByPhaseDataLoaded ? (
                                <ContainerGridWithBorder p={4}>
                                    <Stack>
                                        <LightHeading>Proyectos por fase</LightHeading>
                                        <Stack mt={1}>
                                            <StatsByPhaseChart
                                                data={statsByPhaseData}
                                            />
                                        </Stack>
                                    </Stack>
                                </ContainerGridWithBorder>
                            ) : (
                                <Spinner />
                            )}
                        </PaperComponent>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperComponent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {projectsLoaded ? (
                                        <LatestProjectsList projects={projects} />
                                    ) : (
                                        <Spinner />
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    {contractsLoaded ? (
                                        <LatestContractsList contracts={contracts} />
                                    ) : (
                                        <Spinner />
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    {providersLoaded ? (
                                        <LatestProvidersList providers={providers} />
                                    ) : (
                                        <Spinner />
                                    )}
                                </Grid>
                            </Grid>
                        </PaperComponent>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    lg={6}
                    rowSpacing={2}
                    alignContent="flex-start"
                >
                    <Grid item xs={12}>
                        <PaperComponent>
                            {notificationsLoaded ? (
                                <NotificationsWidget notifications={notifications} />
                            ) : (
                                <Spinner />
                            )}
                        </PaperComponent>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperComponent>
                            {eventsLoaded ? (
                                <ComingEventsWidget events={events} />
                            ) : (
                                <Spinner />
                            )}
                        </PaperComponent>
                    </Grid>
                </Grid>
            </Grid>
        </PageLayout>
    );
};

export default ViewHomePage;
