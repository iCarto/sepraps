import {useState, useEffect, createContext, useContext} from "react";
import {LocationService} from "sepraps/location/service";

let LocationContext = createContext(null);

export default function LocationProvider({children}) {
    const [departments, setDepartments] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [localities, setLocalities] = useState([]);

    useEffect(() => {
        Promise.all([LocationService.getAdministrativeDivisions()]).then(
            ([administrativeDivisions]) => {
                console.log(administrativeDivisions);
                const {departments, districts, localities} = administrativeDivisions;
                setDepartments(departments);
                setDistricts(districts);
                setLocalities(localities);
            }
        );
    }, []);

    let value = {
        departments,
        districts,
        localities,
    };

    return (
        <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
    );
}

function useAdministrativeDivisions() {
    return useContext(LocationContext);
}

export {useAdministrativeDivisions};
