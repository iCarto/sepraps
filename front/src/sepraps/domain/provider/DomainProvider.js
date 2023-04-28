import {useState, useEffect, createContext, useContext} from "react";
import {DomainService} from "sepraps/domain/service";
import {FinancingService} from "financing/service";

let DomainContext = createContext(null);

export default function DomainProvider({children}) {
    const [projectTypes, setProjectTypes] = useState([]);
    const [projectClasses, setProjectClasses] = useState([]);
    const [contactPosts, setContactPosts] = useState([]);
    const [contractorTypes, setContractorTypes] = useState([]);
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        Promise.all([
            DomainService.getDomain(),
            FinancingService.getFinancingFunds(),
            FinancingService.getFinancingPrograms(),
        ]).then(([domain]) => {
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
        });
    }, []);

    let value = {
        projectTypes,
        projectClasses,
        areas,
        contactPosts,
        contractorTypes,
    };

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
}

function useDomain() {
    return useContext(DomainContext);
}

export {useDomain};
