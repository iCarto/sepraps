import {useState, useEffect, createContext, useContext} from "react";
import {
    ContactService,
    DomainService,
    FinancingService,
    LocationService,
    ProviderService,
} from "service/api";

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
    const [providers, setProviders] = useState([]);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        Promise.all([
            DomainService.getDomain(),
            LocationService.getAdministrativeDivisions(),
            FinancingService.getFinancingFunds(),
            FinancingService.getFinancingPrograms(),
            ProviderService.getProviders(),
            ContactService.getContacts(),
        ]).then(
            ([
                domain,
                administrativeDivisions,
                financingFunds,
                financingPrograms,
                providers,
                contacts,
            ]) => {
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

                setProviders(providers);
                setContacts(contacts);
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
        providers,
        contacts,
    };

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
}

function useDomain() {
    return useContext(DomainContext);
}

export {useDomain};
