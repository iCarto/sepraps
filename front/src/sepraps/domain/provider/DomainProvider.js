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
    const [productStatus, setProductStatus] = useState([]);
    const [deliverableStatus, setDeliverableStatus] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [totalAmountTypes, setTotalAmountTypes] = useState([]);
    const [productFrequencyTypes, setProductFrequencyTypes] = useState([]);
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
                estado_producto,
                estado_entregable,
                tipo_servicio,
                tipo_monto,
                frecuencia_producto,
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
            setProductStatus(estado_producto);
            setDeliverableStatus(estado_entregable);
            setContactPosts(contact_post);
            setContractorTypes(contractor_type);
            setServiceTypes(tipo_servicio);
            setTotalAmountTypes(tipo_monto);
            setProductFrequencyTypes(frecuencia_producto);
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
        productStatus,
        deliverableStatus,
        serviceTypes,
        totalAmountTypes,
        productFrequencyTypes,
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
