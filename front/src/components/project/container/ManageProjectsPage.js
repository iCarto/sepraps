import {useState} from "react";
import {Outlet} from "react-router-dom";
import {useSearch} from "hooks";

import {ProjectListViewProvider} from "../provider";

/**
 * High Order Component that stores filter and project list
 * @returns
 */
const ManageProjectsPage = () => {
    const [filteredProjects, setFilteredProjects] = useState([]);
    const {searchText, setSearchText, searchFunction} = useSearch("");

    return (
        <ProjectListViewProvider>
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
        </ProjectListViewProvider>
    );
};

export default ManageProjectsPage;
