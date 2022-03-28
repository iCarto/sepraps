import {useNavigate, useOutletContext} from "react-router-dom";
import {useState, useEffect, useMemo} from "react";
import {ProjectService} from "service/api";

import {useProjectListView} from "../provider";
import {PageLayoutWithPanel} from "layout";
import {
    ProjectList,
    ProjectsTable,
    ShowNoOfProjects,
    ProjectListChangeView,
    SortProjectsSelect,
    ClosedProjectsOption
} from "../presentational";
import {MapProjects} from "components/common/geo";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {useSort, useSearch, useFilter} from "hooks";
import {PageLayout} from "layout";
import {AccordionUndercoverLayout, SearchBox} from "components/common/presentational";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {FormLocationFilter, FormSelectMultipleChip} from "components/common/form";
import {LocationProvider, useAdministrativeDivisions} from "components/common/provider";
import FilterListIcon from "@mui/icons-material/FilterList";

const fabStyle = {
    position: "fixed",
    zIndex: 2,
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
        // filteredProjects,
        setFilteredProjects,
    } = context;

    const {view} = useProjectListView();

    const divisions = useAdministrativeDivisions();
    const [projects, setProjects] = useState([]);
    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "updated_at",
        "desc"
    );

    const [filters, setFilters] = useState([]);
    const {filterItem, setFilterItem, filterFunction} = useFilter("");
    const [showClosedProjects, setShowClosedProjects] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    useEffect(() => {
        ProjectService.getProjects(showClosedProjects).then(data => {
            setProjects(data);
        });
    }, [showClosedProjects]);

    const filteredProjects = useMemo(() => {
        return projects
            .filter(filterFunction)
            .filter(searchFunction)
            .sort(sortFunction);
    }, [attribute, order, searchText, filterItem, projects]);

    const handleSearch = data => {
        setSearchText(data);
    };

    const handleSortBy = (attribute, order) => {
        setAttribute(attribute);
        setOrder(order);
    };

    const handleFilter = filterCriteria => {
        setFilterItem(filterCriteria);
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
            <LocationProvider>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    mb={1}
                >
                    <Grid item container xs={12} spacing={2}>
                        <Grid item xs={6} md={4} xl={3}>
                            <SearchBox
                                searchValue={searchText}
                                handleSearch={handleSearch}
                            />
                        </Grid>
                        <Grid item xs={6} md={4} xl={3}>
                            <SortProjectsSelect
                                attribute={attribute}
                                order={order}
                                handleSortBy={handleSortBy}
                            />
                        </Grid>
                        <Grid item container xs={6} md={2} xl={3}>
                            <ClosedProjectsOption
                                checked={showClosedProjects}
                                handleChange={handleClosedProjects}
                            />
                        </Grid>
                        <Grid
                            item
                            container
                            xs={6}
                            md={2}
                            xl={3}
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Box>
                                <ShowNoOfProjects
                                    numberOfProjects={filteredProjects.length}
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} rowSpacing={1}>
                        <AccordionUndercoverLayout
                            accordionTitle="Filtros"
                            accordionIcon={<FilterListIcon />}
                        >
                            <Grid item container columnSpacing={2} mb={2}>
                                <Grid item xs={12} md={3} xl={2}>
                                    <FormLocationFilter onFilter={handleFilter} />
                                </Grid>
                                {/* <Grid item xs={12} md={3} xl={2}>
                                    <FormLocationFilter onFilter={handleFilter} />
                                </Grid>
                                <Grid item xs={12} md={3} xl={2}>
                                    <FormLocationFilter onFilter={handleFilter} />
                                </Grid> */}
                            </Grid>
                        </AccordionUndercoverLayout>
                    </Grid>
                </Grid>
                </LocationProvider>
            <Grid
                container
                sx={{mb: 2}}
                spacing={2}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                <ProjectListChangeView />
            </Grid>
            {getViewComponent(view)}
            {/**
            <ProjectsTable
                projects={filteredProjects}
                selectedElement={selectedElement}
                onSelectElement={onSelectProject}
            />
            */}
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
