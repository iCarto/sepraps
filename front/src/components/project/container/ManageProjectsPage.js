import {useState} from "react";
import {Outlet} from "react-router-dom";
import {useSort, useSearch, useFilter, useProjectsFilter} from "hooks";

import {ProjectListViewProvider} from "../provider";

/**
 * High Order Component that stores filter and project list
 * @returns
 */
const ManageProjectsPage = () => {
    const [filteredProjects, setFilteredProjects] = useState([]);
    const {searchText, setSearchText, searchFunction} = useSearch("");
    const {filter, setFilter, filterProjectsFunction} = useProjectsFilter([]);

    return (
        <ProjectListViewProvider>
            <Outlet
                context={[
                    {
                        searchText,
                        setSearchText,
                        searchFunction,
                        filter,
                        setFilter,
                        filterProjectsFunction,
                        filteredProjects,
                        setFilteredProjects,
                    },
                ]}
            />
        </ProjectListViewProvider>
    );
};

export default ManageProjectsPage;
