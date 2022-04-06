import {useState} from "react";

/**Using the searchFunction, it searches for a given string (searchText) in an array of items by specific properties*/
function useSearch(initialSearchTextValue) {
    const [searchText, setSearchText] = useState(initialSearchTextValue);

    function searchFunction(item) {
        return [
            item.name,
            item.post,
            item.post_name,
            item.email,
            item.department_name,
            item.district_name,
            item.locality_name,
            item.construction_contract_number,
            item.construction_contract_bid_request_number,
            item.financing_program_name,
            item.financing_fund_name,
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
