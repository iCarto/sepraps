import {useState} from "react";

/**Using the searchFunction, it searches for a given string (searchText) in an array of items by specific properties*/
function useSearch(initialSearchTextValue) {
    const [searchText, setSearchText] = useState(initialSearchTextValue);

    function searchFunction(listOfItems) {
        return [
            listOfItems.name,
            listOfItems.role,
            listOfItems.email,
            listOfItems.department_name,
            listOfItems.district_name,
            listOfItems.locality_name,
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

export {useSearch};
