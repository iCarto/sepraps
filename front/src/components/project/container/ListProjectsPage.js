import {useState, useEffect} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {ProjectService} from "service/api";
import {useSort, useSearch} from "hooks";

import {PageLayoutWithPanel} from "layout";
import {SearchBox} from "components/common/presentational";
import {ClosedProjectsOption, ProjectList, ProjectsTable} from "../presentational";
import {
    SortProjectsSelect,
    ShowNoOfProjects,
    ProjectListChangeView,
} from "../presentational";

import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {MapProjects} from "components/common/geo";
import {useProjectListView} from "../provider";

const fabStyle = {
    position: "absolute",
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
        filteredProjects,
        setFilteredProjects,
    } = context;

    const {view} = useProjectListView();

    const [projects, setProjects] = useState([]);

    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "updated_at",
        "desc"
    );

    const [showClosedProjects, setShowClosedProjects] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    useEffect(() => {
        ProjectService.getProjects(showClosedProjects).then(data => {
            setProjects(data);
            setFilteredProjects([...data].filter(searchFunction).sort(sortFunction));
        });
    }, [showClosedProjects]);

    useEffect(() => {
        setFilteredProjects([...projects].filter(searchFunction).sort(sortFunction));
    }, [attribute, order, searchText]);

    const handleSearch = data => {
        setSearchText(data);
    };

    const handleSortBy = (attribute, order) => {
        setAttribute(attribute);
        setOrder(order);
    };

    const handleClosedProjects = showClosed => {
        console.log("handleClosedProjects", showClosed);
        setShowClosedProjects(showClosed);
    };

    const handleClickOnCard = orojectId => {
        navigate(`/projects/${orojectId}`);
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
            <Grid
                container
                sx={{mb: 4}}
                spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item md={6}>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={6}>
                            <SearchBox
                                searchValue={searchText}
                                handleSearch={handleSearch}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ClosedProjectsOption
                                checked={showClosedProjects}
                                handleChange={handleClosedProjects}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={2}>
                    <ShowNoOfProjects numberOfProjects={filteredProjects.length} />
                </Grid>
                <Grid item md={3}>
                    <SortProjectsSelect
                        attribute={attribute}
                        order={order}
                        handleSortBy={handleSortBy}
                    />
                </Grid>
            </Grid>
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
};

export default ListProjectsPage;
