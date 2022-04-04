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
import {FormContractFilter, FormLocationFilters} from "components/common/form";
import {
    ClosedProjectsOption,
    ProjectList,
    ProjectsTable,
    ShowNoOfProjects,
    ProjectListChangeView,
} from "../presentational";
import {MapProjects} from "components/common/geo";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

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

    const [projects, setProjects] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showClosedProjects, setShowClosedProjects] = useState(false);

    useEffect(() => {
        setLoading(true);
        ProjectService.getProjects(showClosedProjects).then(data => {
            setProjects(data);
            setLoading(false);
        });
    }, [showClosedProjects]);

    const filteredProjects = useMemo(() => {
        return projects.filter(filterFunction).filter(searchFunction);
    }, [searchText, filterItems, projects]);

    const handleSearch = data => {
        setSearchText(data);
    };

    const handleFilter = (filterValue, filterName) => {
        filterValue !== ""
            ? setFilterItems([...filterItems, {value: filterValue, key: filterName}])
            : handleClearFilter(filterName);
    };

    const handleClearFilter = filterName => {
        const itemToRemoveIndex = filterItems.findIndex(
            item => item.key === filterName
        );

        filterItems.splice(itemToRemoveIndex, 1);

        const updatedFilterItems = [...filterItems];

        setFilterItems(updatedFilterItems);
    };

    const handleClearAllFilters = () => {
        setFilterItems([]);
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
                        md={6}
                        xl={6}
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
                                <Grid
                                    item
                                    container
                                    columnSpacing={2}
                                    xs={6}
                                    md={7.3}
                                    mb={2}
                                >
                                    <FormLocationFilters
                                        onFilter={handleFilter}
                                        name="department"
                                    />
                                </Grid>
                                <Grid item container xs={3} md={3.6} mb={2}>
                                    <FormContractFilter onFilter={handleFilter} />
                                </Grid>
                                <Grid item container xs={2} md={1} mb={2}>
                                    <Button
                                        color="primary"
                                        fullWidth
                                        onClick={handleClearAllFilters}
                                    >
                                        Borrar
                                    </Button>
                                </Grid>
                            </Grid>
                        </LocationProvider>
                    </AccordionUndercoverLayout>
                </Grid>
            </Grid>
            <Grid container justifyContent="flex-end" spacing={2} mb={2}>
                <ProjectListChangeView />
            </Grid>
            {loading ? (
                <Grid item container justifyContent="center" my={6} xs={12}>
                    <CircularProgress color="inherit" size={40} />
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
