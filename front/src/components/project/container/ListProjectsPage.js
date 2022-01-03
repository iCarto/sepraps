import {useState, useEffect} from "react";
import {ProjectService} from "service/api";
import {ProjectList} from "../presentational";
import {ProjectFinder, SortProjectsSelect, ShowNoOfProjects} from "../presentational";
import {useSortProjects, useSearchProjects} from "components/project/hook";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const ListProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const {attribute, setAttribute, order, setOrder, sortFunction} = useSortProjects(
        "updated_at",
        "desc"
    );
    const {searchText, setSearchText, searchFunction} = useSearchProjects("");

    useEffect(() => {
        ProjectService.getProjects().then(data => {
            setProjects(data);
            setFilteredProjects([...data].filter(searchFunction).sort(sortFunction));
        });
    }, []);

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

    return (
        <Box component="main" sx={{flexGrow: 1, bgcolor: "background.default", p: 3}}>
            <Grid container sx={{mb: 4}} spacing={2}>
                <Grid
                    item
                    xs={12}
                    sm={8}
                    lg={6}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Grid container spacing={2}>
                        <ProjectFinder
                            searchValue={searchText}
                            handleSearch={handleSearch}
                        />
                        <SortProjectsSelect
                            attribute={attribute}
                            order={order}
                            handleSortBy={handleSortBy}
                        />
                    </Grid>
                </Grid>
                <ShowNoOfProjects numberOfProjects={filteredProjects.length} />
            </Grid>
            <ProjectList projects={filteredProjects} />
        </Box>
    );
};

export default ListProjectsPage;