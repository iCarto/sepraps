import {useState, useEffect, createContext, useContext} from "react";
import {DomainService} from "sepraps/domain/service";
import {FinancingService} from "financing/service";

let DomainContext = createContext(null);

export default function DomainProvider({children}) {
    const [yesNoDomain, setYesNoDomain] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [projectClasses, setProjectClasses] = useState([]);
    const [contactPosts, setContactPosts] = useState([]);
    const [contractorTypes, setContractorTypes] = useState([]);
    const [providerAreas, setProviderAreas] = useState([]);
    const [providerTypes, setProviderTypes] = useState([]);
    const [providerLegalStatus, setProviderLegalStatus] = useState([]);

    useEffect(() => {
        Promise.all([
            DomainService.getDomain(),
            FinancingService.getFinancingFunds(),
            FinancingService.getFinancingPrograms(),
        ]).then(([domain]) => {
            const {
                dominiosino,
                project_type,
                project_class,
                contact_post,
                contractor_type,
                area_prestador,
                tipo_prestador,
                naturaleza_juridica,
            } = domain;
            setYesNoDomain(dominiosino);
            setProjectTypes(project_type);
            setProjectClasses(project_class);
            setProviderAreas(area_prestador);
            setProviderTypes(tipo_prestador);
            setProviderLegalStatus(naturaleza_juridica);
            setContactPosts(contact_post);
            setContractorTypes(contractor_type);
        });
    }, []);

    let value = {
        yesNoDomain,
        projectTypes,
        projectClasses,
        providerAreas,
        providerTypes,
        providerLegalStatus,
        contactPosts,
        contractorTypes,
    };

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
}

function useDomain() {
    return useContext(DomainContext);
}

export {useDomain};
