import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ProjectService} from "service/api";
import {useSort, useSearch} from "hooks";

import {PageLayout} from "layout";
import {SearchBox} from "components/common/presentational";
import {ClosedProjectsOption, ProjectList} from "../presentational";
import {SortProjectsSelect, ShowNoOfProjects} from "../presentational";

import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
};

const ListProjectsPage = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "updated_at",
        "desc"
    );
    const {searchText, setSearchText, searchFunction} = useSearch("");
    const [showClosedProjects, setShowClosedProjects] = useState(false);

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

    return (
        <PageLayout>
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
            <ProjectList projects={filteredProjects} onClick={handleClickOnCard} />
            <Fab
                sx={fabStyle}
                color="primary"
                aria-label="add"
                onClick={() => navigate("/projects/new")}
            >
                <AddIcon />
            </Fab>
        </PageLayout>
    );
};

export default ListProjectsPage;
