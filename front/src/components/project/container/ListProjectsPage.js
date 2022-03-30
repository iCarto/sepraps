import {useNavigate, useOutletContext} from "react-router-dom";
import {useState, useEffect, useMemo} from "react";
import {ProjectService} from "service/api";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {useSort, useSearch, useFilter} from "hooks";

import {useProjectListView} from "../provider";
import {LocationProvider} from "components/common/provider";
import {PageLayoutWithPanel} from "layout";
import {
    ClosedProjectsOption,
    ProjectList,
    ProjectsTable,
    SortProjectsSelect,
    ShowNoOfProjects,
    ProjectListChangeView,
} from "../presentational";
import {AccordionUndercoverLayout, SearchBox} from "components/common/presentational";
import {FormContractFilter, FormLocationFilters} from "components/common/form";
import {MapProjects} from "components/common/geo";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
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
        filterItems,
        setFilterItems,
        filterFunction,
    } = context;

    const {view} = useProjectListView();

    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "updated_at",
        "desc"
    );

    const [projects, setProjects] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const [showClosedProjects, setShowClosedProjects] = useState(false);

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
    }, [attribute, order, searchText, filterItems, projects]);

    console.log({filteredProjects});

    const handleSearch = data => {
        setSearchText(data);
    };

    const handleFilter = (filterValue, filterName) => {
        setFilterItems([...filterItems, {value: filterValue, key: filterName}]);
    };

    console.log(filterItems);

    const handleSortBy = (attribute, order) => {
        setAttribute(attribute);
        setOrder(order);
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
            <Grid container spacing={2} mb={1}>
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
                        justifyContent="flex-end"
                        alignItems="center"
                        xs={6}
                        md={2}
                        xl={3}
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
                        <LocationProvider>
                            <Grid container columnSpacing={2}>
                                <Grid item container columnSpacing={2} xs={8} mb={2}>
                                    <FormLocationFilters
                                        onFilter={handleFilter}
                                        name="department"
                                    />
                                </Grid>
                                <Grid item container xs={4} mb={2}>
                                    <FormContractFilter onFilter={handleFilter} />
                                </Grid>
                            </Grid>
                        </LocationProvider>
                    </AccordionUndercoverLayout>
                </Grid>
            </Grid>
            <Grid container justifyContent="flex-end" spacing={2} mb={2}>
                <ProjectListChangeView />
            </Grid>
            {getViewComponent(view)}

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
