import {useState, useEffect, createContext, useContext} from "react";
import {
    ContactService,
    ContractorService,
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
    const [contractorTypes, setContractorTypes] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [localities, setLocalities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [financingFunds, setFinancingFunds] = useState([]);
    const [financingPrograms, setFinancingPrograms] = useState([]);
    const [providers, setProviders] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [contractors, setContractors] = useState([]);

    useEffect(() => {
        Promise.all([
            DomainService.getDomain(),
            LocationService.getAdministrativeDivisions(),
            FinancingService.getFinancingFunds(),
            FinancingService.getFinancingPrograms(),
            ProviderService.getProviders(),
            ContactService.getContacts(),
            ContractorService.getContractors(),
        ]).then(
            ([
                domain,
                administrativeDivisions,
                financingFunds,
                financingPrograms,
                providers,
                contacts,
                contractors,
            ]) => {
                const {
                    project_type,
                    project_class,
                    provider_area,
                    contact_post,
                    contractor_type,
                } = domain;
                setProjectTypes(project_type);
                setProjectClasses(project_class);
                setAreas(provider_area);
                setContactPosts(contact_post);
                setContractorTypes(contractor_type);

                const {departments, districts, localities} = administrativeDivisions;
                setDepartments(departments);
                setDistricts(districts);
                setLocalities(localities);

                setFinancingFunds(financingFunds);
                setFinancingPrograms(financingPrograms);

                setProviders(providers);

                setContacts(contacts);
                setContractors(contractors);
            }
        );
    }, []);

    let value = {
        projectTypes,
        projectClasses,
        areas,
        contactPosts,
        contractorTypes,
        departments,
        districts,
        localities,
        financingFunds,
        financingPrograms,
        providers,
        contacts,
        contractors,
    };

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
}

function useDomain() {
    return useContext(DomainContext);
}

export {useDomain};
