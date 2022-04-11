import {useNavigate, useOutletContext} from "react-router-dom";
import {useState, useEffect, useMemo} from "react";
import {ProjectService} from "service/api";

import {useProjectListView} from "../provider";
import {LocationProvider} from "components/common/provider";
import {PageLayoutWithPanel} from "layout";
import {ProjectFilterForm} from "../presentational/form";
import {
    ProjectList,
    ProjectsTable,
    ShowNoOfProjects,
    ProjectListChangeView,
} from "../presentational";
import {MapProjects} from "components/common/geo";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";

const fabStyle = {
    position: "fixed",
    // Leaflet CSS stylesheet is setting map elements' Z-index from 100 to 1000
    zIndex: 1001,
    bottom: 16,
    right: 16,
};

const ListProjectsPage = () => {
    const navigate = useNavigate();

    let context;
    [context] = useOutletContext();

    const {filter, setFilter, filterProjectsFunction, setFilteredProjects} = context;

    const {view} = useProjectListView();

    const [projects, setProjects] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        ProjectService.getProjects(filter).then(data => {
            setProjects(data);
            setLoading(false);
        });
    }, [filter.status]);

    const filteredProjects = useMemo(() => {
        setFilteredProjects(projects.filter(filterProjectsFunction));
        return projects.filter(filterProjectsFunction);
    }, [filter, projects]);

    const handleFilterChange = filterAttributes => {
        setFilter(filterAttributes);
    };

    const handleClickOnCard = projectId => {
        navigate(`/projects/${projectId}`);
    };

    const onSelectProject = project => {
        setSelectedElement(project);
        navigate(`info/${project.id}`);
    };

    const getViewComponent = view => {
        if (view === "map") {
            return (
                <MapProjects
                    projects={filteredProjects}
                    selectedElement={selectedElement}
                    onSelectElement={onSelectProject}
                />
            );
        }
        if (view === "list") {
            return (
                <ProjectList projects={filteredProjects} onClick={handleClickOnCard} />
            );
        }
        return (
            <ProjectsTable
                projects={filteredProjects}
                selectedElement={selectedElement}
                onSelectElement={onSelectProject}
            />
        );
    };

    return (
        <PageLayoutWithPanel>
            <Paper sx={{p: 3}}>
                <Grid
                    container
                    sx={{mb: 4}}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item container direction="row">
                        <Grid item container xs={8}>
                            <LocationProvider>
                                <ProjectFilterForm onChange={handleFilterChange} />
                            </LocationProvider>
                        </Grid>

                        <Grid
                            item
                            container
                            xs={4}
                            alignItems="flex-start"
                            justifyContent="flex-end"
                        >
                            <Stack direction="row" spacing={2}>
                                <ShowNoOfProjects
                                    numberOfProjects={filteredProjects.length}
                                />
                                <ProjectListChangeView />
                            </Stack>
                        </Grid>
                    </Grid>

                    {loading ? (
                        <Grid container justifyContent="center" my={6}>
                            <CircularProgress size={40} />
                        </Grid>
                    ) : (
                        getViewComponent(view)
                    )}
                </Grid>
            </Paper>

            <Fab
                sx={fabStyle}
                color="primary"
                aria-label="add"
                onClick={() => navigate("/projects/new")}
            >
                <AddIcon />
            </Fab>
        </PageLayoutWithPanel>
    );
};
export default ListProjectsPage;
