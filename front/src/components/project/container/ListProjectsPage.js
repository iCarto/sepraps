import {useNavigate, useOutletContext} from "react-router-dom";
import {useState, useEffect, useMemo} from "react";
import {ProjectService} from "service/api";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {useSort, useSearch, useFilter} from "hooks";

import {useProjectListView} from "../provider";
import {LocationProvider} from "components/common/provider";
import {PageLayoutWithPanel} from "layout";
import {AccordionUndercoverLayout, SearchBox} from "components/common/presentational";
import {ProjectFilterForm} from "../presentational/form";
import {
    ClosedProjectsOption,
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
        filteredProjects,
        setFilteredProjects,
    } = context;

    const {view} = useProjectListView();

    const [projects, setProjects] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    // quitar el showprojectsclosed del estado para meterlo en el filtro
    const [showClosedProjects, setShowClosedProjects] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        /// el atributo será filterItems.showClosedProjects - que debe devolver true o false
        ProjectService.getProjects(showClosedProjects).then(data => {
            setProjects(data);
            setLoading(false);
        });
    }, [showClosedProjects]);

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

    const handleClosedProjects = showClosed => {
        console.log("handleClosedProjects", showClosed);
        setShowClosedProjects(showClosed);
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

    /// Sacarf el valor del search y actualizar filteritems en el filtro

    return (
        <PageLayoutWithPanel>
            <Grid container spacing={2} mb={1}>
                <Grid item container xs={12} spacing={2}>
                    <Grid item xs={4} md={4} xl={3}>
                        <SearchBox
                            searchValue={searchText}
                            handleSearch={handleSearch}
                        />
                    </Grid>
                    <Grid item container xs={4} md={2} xl={3}>
                        <ClosedProjectsOption
                            checked={showClosedProjects}
                            handleChange={handleClosedProjects}
                        />
                    </Grid>
                    <Grid
                        item
                        container
                        justifyContent="flex-end"
                        alignItems="center"
                        xs={4}
                        md={6}
                        xl={6}
                    >
                        <ShowNoOfProjects
                            numberOfProjects={filteredOnTheGoProjects.length}
                        />
                    </Grid>
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

            <Grid container justifyContent="flex-end" spacing={2} mb={2}>
                <ProjectListChangeView />
            </Grid>
            {loading ? (
                <Grid container justifyContent="center" my={6}>
                    <CircularProgress size={40} />
                </Grid>
            ) : (
                getViewComponent(view)
            )}

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
}
    ;

export default ListProjectsPage;
