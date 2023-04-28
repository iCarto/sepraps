import {useEffect, useState} from "react";

import {ContractService} from "contract/service";
import {ProjectService} from "project/service";
import {StatsService} from "stats/service";
import {NotificationService} from "notification/service";
import {EventService} from "event/service";

import {PageLayout} from "base/ui/main";
import {NotificationsWidget} from "notification/presentational";
import {ComingEventsWidget} from "event/presentational";
import {SectionCard} from "base/section/components";
import {SmallIconCard} from "base/shared/components";
import {LatestProjectsList} from "project/presentational";
import {LatestContractsList} from "contract/presentational";
import {StatsByPhaseChart} from "stats/presentational";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import CasesOutlinedIcon from "@mui/icons-material/CasesOutlined";

const ViewHomePage = () => {
    const [projects, setProjects] = useState([]);
    const [contracts, setContracts] = useState([]);
    const [projectsNumber, setProjectsNumber] = useState(null);
    const [contractsNumber, setContractsNumber] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [events, setEvents] = useState([]);
    const [statsByPhaseData, setStatsByPhaseData] = useState([]);

    useEffect(() => {
        StatsService.getStatsByProjectsAndContracts().then(data => {
            setProjectsNumber(data.find(item => item.name === "opened_projects").total);
            setContractsNumber(
                data.find(item => item.name === "opened_contracts").total
            );
        });
        ProjectService.getAll({last_modified_items: 3}).then(data => {
            setProjects(data.sort((a, b) => b.updated_at - a.updated_at));
        });
        ContractService.getAll({last_modified_items: 3}).then(data => {
            setContracts(data.sort((a, b) => b.updated_at - a.updated_at));
        });
        NotificationService.getNotifications().then(data => {
            setNotifications(data);
        });
        EventService.getEvents().then(data => {
            setEvents(data.sort((a, b) => a.date - b.date));
        });
        StatsService.getStatsByPhase().then(data => {
            data.sort((a, b) =>
                a.phase_name > b.phase_name ? 1 : b.phase_name > a.phase_name ? -1 : 0
            );
            setStatsByPhaseData(data);
        });
    }, []);

    return (
        <PageLayout styleProps={{p: 2}}>
            <Grid container sx={{mb: 4}} spacing={2} justifyContent="space-between">
                <Grid
                    item
                    container
                    xs={12}
                    md={6}
                    spacing={2}
                    alignContent="flex-start"
                >
                    <Grid item container xs={4} spacing={2}>
                        <Grid item xs={12}>
                            <SmallIconCard
                                heading="Contratos"
                                figureContent={contractsNumber}
                                urlPath="/contracts"
                                icon={
                                    <CasesOutlinedIcon
                                        sx={{fontSize: "60px", lineHeight: 0}}
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
                                        sx={{fontSize: "60px", lineHeight: 0}}
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid item container xs={8}>
                        <SectionCard
                            headingLabel={false}
                            contentStyle={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                mt: 1,
                            }}
                        >
                            <Typography
                                variant="overline"
                                lineHeight={1}
                                color="grey.800"
                                mb={3}
                            >
                                Proyectos por fase
                            </Typography>
                            <Box>
                                <StatsByPhaseChart data={statsByPhaseData} />
                            </Box>
                        </SectionCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SectionCard
                            title="Últimas modificaciones"
                            headingLabel={false}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <LatestProjectsList projects={projects} />
                                </Grid>
                                <Grid item xs={12}>
                                    <LatestContractsList contracts={contracts} />
                                </Grid>
                            </Grid>
                        </SectionCard>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    md={6}
                    spacing={2}
                    alignContent="flex-start"
                >
                    <Grid item xs={12}>
                        <NotificationsWidget notifications={notifications} />
                    </Grid>
                    <Grid item xs={12}>
                        <ComingEventsWidget events={events} />
                    </Grid>
                </Grid>
            </Grid>
        </PageLayout>
    );
};

export default ViewHomePage;
