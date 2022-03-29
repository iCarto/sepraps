import {useState, useEffect} from "react";
import {Outlet} from "react-router-dom";
import {useSort, useSearch} from "hooks";

import Box from "@mui/material/Box";

/**
 * High Order Component that stores filter and project list
 * @returns
 */
const ManageProjectsPage = () => {
    const [filteredProjects, setFilteredProjects] = useState([]);
    const {attribute, setAttribute, order, setOrder, sortFunction} = useSort(
        "updated_at",
        "desc"
    );
    const {searchText, setSearchText, searchFunction} = useSearch("");

    return (
        <Outlet
            context={[
                {
                    searchText,
                    setSearchText,
                    searchFunction,
                    filteredProjects,
                    setFilteredProjects,
                },
            ]}
        />
    );
};

export default ManageProjectsPage;
