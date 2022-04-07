import {useNavigate, useOutletContext} from "react-router-dom";
import {useState, useEffect, useMemo} from "react";
import {ProjectService} from "service/api";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import {useProjectListView} from "../provider";
import {LocationProvider} from "components/common/provider";
import {PageLayoutWithPanel} from "layout";
import {AccordionUndercoverLayout, SearchBox} from "components/common/presentational";
import {ProjectFilterForm} from "../presentational/form";
import {
    ProjectList,
    ProjectsTable,
    ShowNoOfProjects,
    ProjectListChangeView,
} from "../presentational";
import {MapProjects} from "components/common/geo";

import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
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

    const {
        searchText,
        setSearchText,
        searchFunction,
        filterItems,
        setFilterItems,
        filterProjectsFunction,
        setFilteredProjects,
    } = context;

    const {view} = useProjectListView();

    const [projects, setProjects] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        ProjectService.getProjects(filterItems.showClosedProjects).then(data => {
            setProjects(data);
            setLoading(false);
        });
    }, [filterItems.showClosedProjects]);

    const filteredOnTheGoProjects = useMemo(() => {
        setFilteredProjects(
            projects.filter(filterProjectsFunction).filter(searchFunction)
        );
        return projects.filter(filterProjectsFunction).filter(searchFunction);
    }, [searchText, filterItems, projects]);

    const handleSearch = data => {
        setSearchText(data);
    };

    const handleFilterChange = filterAttributes => {
        setFilterItems(filterAttributes);
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
                    projects={filteredOnTheGoProjects}
                    selectedElement={selectedElement}
                    onSelectElement={onSelectProject}
                />
            );
        }
        if (view === "list") {
            return (
                <ProjectList
                    projects={filteredOnTheGoProjects}
                    onClick={handleClickOnCard}
                />
            );
        }
        return (
            <ProjectsTable
                projects={filteredOnTheGoProjects}
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
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid
                        item
                        container
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <SearchBox
                            searchValue={searchText}
                            handleSearch={handleSearch}
                        />
                        <Stack direction="row" spacing={2}>
                            <ShowNoOfProjects
                                numberOfProjects={filteredOnTheGoProjects.length}
                            />
                            <ProjectListChangeView />
                        </Stack>
                    </Grid>

                    <Grid item container xs={12} rowSpacing={1}>
                        <AccordionUndercoverLayout
                            accordionTitle="Filtros"
                            accordionIcon={<FilterListIcon />}
                        >
                            <LocationProvider>
                                <ProjectFilterForm onChange={handleFilterChange} />
                            </LocationProvider>
                        </AccordionUndercoverLayout>
                    </Grid>
                </Grid>

                {loading ? (
                    <Grid container justifyContent="center" my={6}>
                        <CircularProgress size={40} />
                    </Grid>
                ) : (
                    getViewComponent(view)
                )}
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
