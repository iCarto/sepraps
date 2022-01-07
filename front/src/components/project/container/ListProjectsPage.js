import {useState, useEffect} from "react";
import {ProjectService} from "service/api";
import {useSort, useSearch} from "hooks";
import {SearchBox} from "components/common/presentational";
import {ClosedProjectsOption, ProjectList} from "../presentational";
import {SortProjectsSelect, ShowNoOfProjects} from "../presentational";

import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const ListProjectsPage = () => {
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

    return (
        <Box component="main" sx={{flexGrow: 1, bgcolor: "background.default", p: 3}}>
            {
                // Fixed header needs a fixed space between top margin and the top of the child component
                // MUI examples add a empty toolbar to solve this problem
                // TODO: Check if there is a good solution for this
                <Toolbar />
            }
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
            <ProjectList projects={filteredProjects} />
        </Box>
    );
};

export default ListProjectsPage;
