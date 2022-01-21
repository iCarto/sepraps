import {useState, useEffect, createContext, useContext} from "react";
import {DomainService, FinancingService, LocationService} from "service/api";

let DomainContext = createContext(null);

export default function DomainProvider({children}) {
    const [projectTypes, setProjectTypes] = useState([]);
    const [projectClasses, setProjectClasses] = useState([]);
    const [contactPosts, setContactPosts] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [localities, setLocalities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [financingFunds, setFinancingFunds] = useState([]);
    const [financingPrograms, setFinancingPrograms] = useState([]);

    useEffect(() => {
        Promise.all([
            DomainService.getDomain(),
            LocationService.getAdministrativeDivisions(),
            FinancingService.getFinancingFunds(),
            FinancingService.getFinancingPrograms(),
        ]).then(
            ([domain, administrativeDivisions, financingFunds, financingPrograms]) => {
                const {
                    project_type,
                    project_class,
                    provider_area,
                    contact_post,
                } = domain;
                setProjectTypes(project_type);
                setProjectClasses(project_class);
                setAreas(provider_area);
                setContactPosts(contact_post);

                const {departments, districts, localities} = administrativeDivisions;
                setDepartments(departments);
                setDistricts(districts);
                setLocalities(localities);

                setFinancingFunds(financingFunds);
                setFinancingPrograms(financingPrograms);
            }
        );
    }, []);

    let value = {
        projectTypes,
        projectClasses,
        areas,
        contactPosts,
        departments,
        districts,
        localities,
        financingFunds,
        financingPrograms,
    };

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
}

function useDomain() {
    return useContext(DomainContext);
}

export {useDomain};
