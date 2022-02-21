import {useState, useEffect, createContext, useContext} from "react";
import {DomainService, FinancingService} from "service/api";

let DomainContext = createContext(null);

export default function DomainProvider({children}) {
    const [projectTypes, setProjectTypes] = useState([]);
    const [projectClasses, setProjectClasses] = useState([]);
    const [contactPosts, setContactPosts] = useState([]);
    const [contractorTypes, setContractorTypes] = useState([]);
    const [areas, setAreas] = useState([]);
    const [financingFunds, setFinancingFunds] = useState([]);
    const [financingPrograms, setFinancingPrograms] = useState([]);

    useEffect(() => {
        Promise.all([
            DomainService.getDomain(),
            FinancingService.getFinancingFunds(),
            FinancingService.getFinancingPrograms(),
        ]).then(([domain, financingFunds, financingPrograms]) => {
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

            setFinancingFunds(financingFunds);
            setFinancingPrograms(financingPrograms);
        });
    }, []);

    let value = {
        projectTypes,
        projectClasses,
        areas,
        contactPosts,
        contractorTypes,
        financingFunds,
        financingPrograms,
    };

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
}

function useDomain() {
    return useContext(DomainContext);
}

export {useDomain};
