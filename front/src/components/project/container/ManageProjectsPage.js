import {useState} from "react";
import {Outlet} from "react-router-dom";
import {useProjectsFilter} from "hooks";

import {ProjectListViewProvider} from "../provider";

/**
 * High Order Component that stores filter and project list
 * @returns
 */
const ManageProjectsPage = () => {
    const [filteredProjects, setFilteredProjects] = useState([]);
    const {filter, setFilter, filterProjectsFunction} = useProjectsFilter([]);

    return (
        <ProjectListViewProvider>
            <Outlet
                context={[
                    {
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
