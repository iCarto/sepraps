import {useState, useEffect, createContext, useContext} from "react";
import {DomainService} from "sepraps/domain/service";
import {FinancingService} from "financing/service";

let DomainContext = createContext(null);

export default function DomainProvider({children}) {
    const [yesNoDomain, setYesNoDomain] = useState([]);
    const [genderDomain, setGenderDomain] = useState([]);
    const [phasesDomain, setPhasesDomain] = useState([]);
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
    const [qualityStatusTypes, setQualityStatusTypes] = useState([]);
    const [executionStatusTypes, setExecutionStatusTypes] = useState([]);
    const [targetPopulationTypes, setTargetPopulationTypes] = useState([]);
    const [trainingMethodTypes, setTrainingMethodTypes] = useState([]);

    useEffect(() => {
        Promise.all([
            DomainService.getDomain(),
            FinancingService.getFinancingFunds(),
            FinancingService.getFinancingPrograms(),
        ]).then(([domain]) => {
            const {
                dominiosino,
                gender,
                etapas,
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
                estado_cualitativo,
                estado_ejecucion,
                poblacion_meta,
                modalidad_capacitacion,
            } = domain;
            setYesNoDomain(dominiosino);
            setGenderDomain(gender);
            setPhasesDomain(etapas);
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
            setQualityStatusTypes(estado_cualitativo);
            setExecutionStatusTypes(estado_ejecucion);
            setTargetPopulationTypes(poblacion_meta);
            setTrainingMethodTypes(modalidad_capacitacion);
        });
    }, []);

    let value = {
        yesNoDomain,
        genderDomain,
        phasesDomain,
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
        qualityStatusTypes,
        executionStatusTypes,
        targetPopulationTypes,
        trainingMethodTypes,
    };

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
}

function useDomain() {
    return useContext(DomainContext);
}

export {useDomain};
