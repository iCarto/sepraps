import {useState, useEffect, useCallback} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {AuthAction, useAuth} from "auth";
import {ProjectService} from "service/api";

import {useProjectListView} from "../provider";
import {PageLayoutWithPanel} from "layout";
import {ProjectFilterForm} from "../presentational/form";
import {ProjectsList, ProjectsTable, ProjectListChangeView} from "../presentational";
import {MapProjects} from "components/common/geo";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";

const ListProjectsPage = () => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    let context;
    [context] = useOutletContext();

    const {
        filter,
        setFilter,
        filterProjectsFunction,
        filteredProjects,
        setFilteredProjects,
    } = context;

    const {view} = useProjectListView();

    const [projects, setProjects] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        ProjectService.getProjects(filter).then(data => {
            setProjects(data);
            setFilteredProjects([...data].filter(filterProjectsFunction));
            setLoading(false);
        });
    }, [filter.status]);

    useEffect(() => {
        setFilteredProjects(projects.filter(filterProjectsFunction));
    }, [filter]);

    const handleFilterChange = useCallback(
        (attribute, value) => {
            setFilter({...filter, [attribute]: value});
        },
        [filter]
    );

    const handleFilterClear = useCallback(() => {
        setFilter({status: "active"});
    }, [filter]);

    const handleClickOnCard = projectId => {
        navigate(`/projects/${projectId}/summary`);
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
                <ProjectsList projects={filteredProjects} onClick={handleClickOnCard} />
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

    let noProjectsMessage =
        filter.length === 0
            ? "No existen proyectos para mostrar"
            : "No se ha encontrado ning??n proyecto que coincida con su b??squeda. Por favor, intente realizar otra b??squeda o borre los filtros activos.";

    return (
        <PageLayoutWithPanel>
            <Paper sx={{p: 3}}>
                <Grid
                    container
                    sx={{mb: 4}}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item container spacing={2}>
                        <Grid item container xs={8}>
                            <ProjectFilterForm
                                filter={filter}
                                filteredNumber={filteredProjects.length}
                                onChange={handleFilterChange}
                                onClear={handleFilterClear}
                            />
                        </Grid>

                        <Grid
                            item
                            container
                            xs={4}
                            alignItems="flex-start"
                            justifyContent="flex-end"
                        >
                            <Stack direction="row" spacing={2}>
                                <AuthAction
                                    roles={[ROLES.MANAGEMENT, ROLES.SUPERVISION]}
                                >
                                    <Button
                                        id="basic-button"
                                        color="primary"
                                        variant="contained"
                                        sx={{mr: 2, py: 1, lineHeight: 1.25}}
                                        onClick={() => {
                                            navigate("/projects/new");
                                        }}
                                        startIcon={<AddIcon />}
                                    >
                                        Nuevo proyecto
                                    </Button>
                                </AuthAction>
                                <ProjectListChangeView />
                            </Stack>
                        </Grid>
                    </Grid>

                    {loading ? (
                        <Grid container justifyContent="center" my={6}>
                            <CircularProgress size={40} />
                        </Grid>
                    ) : filteredProjects.length !== 0 ? (
                        getViewComponent(view)
                    ) : (
                        <Container sx={{textAlign: "center"}}>
                            <Typography py={12} sx={{fontStyle: "italic"}}>
                                {noProjectsMessage}
                            </Typography>
                        </Container>
                    )}
                </Grid>
            </Paper>
        </PageLayoutWithPanel>
    );
};
export default ListProjectsPage;
