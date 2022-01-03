import {useState} from "react";

function useSearchProjects(initialSearchTextValue) {
    const [searchText, setSearchText] = useState(initialSearchTextValue);

    function searchFunction(project) {
        return [
            project.name,
            project.department_name,
            project.district_name,
            project.locality_name,
        ]
            .toString()
            .toUpperCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
                searchText
                    .toUpperCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
            );
    }

    return {searchText, setSearchText, searchFunction};
}

export {useSearchProjects};
