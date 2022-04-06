import {useState, useEffect} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {ProjectService} from "service/api";

import {PageLayoutWithPanel} from "layout";
import {SearchBox} from "components/common/presentational";
import {ProjectList, ProjectsTable} from "../presentational";
import {ShowNoOfProjects, ProjectListChangeView} from "../presentational";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
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

    const [showClosedProjects, setShowClosedProjects] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    useEffect(() => {
        ProjectService.getProjects(showClosedProjects).then(data => {
            setProjects(data);
            setFilteredProjects([...data].filter(searchFunction));
        });
    }, [showClosedProjects]);

    useEffect(() => {
        setFilteredProjects([...projects].filter(searchFunction));
    }, [searchText]);

    const handleSearch = data => {
        setSearchText(data);
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
                                numberOfProjects={filteredProjects.length}
                            />
                            <ProjectListChangeView />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} rowSpacing={1}>
                        {/* Space for future filters */}
                    </Grid>
                </Grid>
                {getViewComponent(view)}
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
