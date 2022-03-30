import {useState} from "react";
import {Outlet} from "react-router-dom";
import {useSort, useSearch, useFilter} from "hooks";

import {ProjectListViewProvider} from "../provider";

/**
 * High Order Component that stores filter and project list
 * @returns
 */
const ManageProjectsPage = () => {
    const [filteredProjects, setFilteredProjects] = useState([]);
    const {searchText, setSearchText, searchFunction} = useSearch("");
    const {filterItems, setFilterItems, filterFunction} = useFilter([]);

    return (
        <ProjectListViewProvider>
            <Outlet
                context={[
                    {
                        searchText,
                        setSearchText,
                        searchFunction,
                        filterItems,
                        setFilterItems,
                        filterFunction,
                        filteredProjects,
                        setFilteredProjects,
                    },
                ]}
            />
        </ProjectListViewProvider>
    );
};

export default ManageProjectsPage;
