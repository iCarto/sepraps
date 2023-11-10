import {useState, useEffect, createContext, useContext} from "react";
import {DomainService} from "sepraps/domain/service";
import {FinancingService} from "financing/service";

let DomainContext = createContext(null);

export default function DomainProvider({children}) {
    const [yesNoDomain, setYesNoDomain] = useState([]);
    const [genderDomain, setGenderDomain] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);
    const [projectClasses, setProjectClasses] = useState([]);
    const [contactPosts, setContactPosts] = useState([]);
    const [contractorTypes, setContractorTypes] = useState([]);
    const [providerAreas, setProviderAreas] = useState([]);
    const [providerTypes, setProviderTypes] = useState([]);
    const [paymentStatus, setPaymentStatus] = useState([]);
    const [productStatus, setProductStatus] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [totalAmountTypes, setTotalAmountTypes] = useState([]);
    const [paymentFrequencyTypes, setPaymentFrequencyTypes] = useState([]);
    const [paymentCriteriaTypes, setPaymentCriteriaTypes] = useState([]);

    useEffect(() => {
        Promise.all([
            DomainService.getDomain(),
            FinancingService.getFinancingFunds(),
            FinancingService.getFinancingPrograms(),
        ]).then(([domain]) => {
            const {
                dominiosino,
                gender,
                project_type,
                project_class,
                contact_post,
                contractor_type,
                area_prestador,
                tipo_prestador,
                estado_pago,
                estado_entregable,
                tipo_servicio,
                tipo_monto,
                frecuencia_pago,
                criterio_pago,
            } = domain;
            setYesNoDomain(dominiosino);
            setGenderDomain(gender);
            setProjectTypes(project_type);
            setProjectClasses(project_class);
            setProviderAreas(area_prestador);
            setProviderTypes(tipo_prestador);
            setPaymentStatus(estado_pago);
            setProductStatus(estado_entregable);
            setContactPosts(contact_post);
            setContractorTypes(contractor_type);
            setServiceTypes(tipo_servicio);
            setTotalAmountTypes(tipo_monto);
            setPaymentFrequencyTypes(frecuencia_pago);
            setPaymentCriteriaTypes(criterio_pago);
        });
    }, []);

    let value = {
        yesNoDomain,
        genderDomain,
        projectTypes,
        projectClasses,
        providerAreas,
        providerTypes,
        paymentStatus,
        productStatus,
        serviceTypes,
        totalAmountTypes,
        paymentFrequencyTypes,
        paymentCriteriaTypes,
        contactPosts,
        contractorTypes,
    };

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
}

function useDomain() {
    return useContext(DomainContext);
}

export {useDomain};
