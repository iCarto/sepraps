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
    const [amendmentTypes, setAmendmentTypes] = useState([]);
    // Domains for component properties --------------->
    const [cisternType, setCisternType] = useState([]);
    const [cisternLocation, setCisternLocation] = useState([]);
    const [tankType, setTankType] = useState([]);
    const [pipeType, setPipeType] = useState([]);
    const [pondType, setPondType] = useState([]);
    const [energyType, setEnergyType] = useState([]);
    const [disposalSystemType, setDisposalSystemType] = useState([]);
    const [boothType, setBoothType] = useState([]);
    const [boothMaterialType, setBoothMaterialType] = useState([]);
    const [toiletMaterialType, setToiletMaterialType] = useState([]);
    // <-------------------------------------

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
                amendment_type,
                material_letrinas,
                tipo_aljibe,
                tipo_laguna,
                tipo_tanque,
                sistema_disposicion,
                tipo_caseta,
                tipo_canheria,
                material_caseta,
                tipo_energia,
                ubicacion_aljibe,
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
            setAmendmentTypes(amendment_type);
            setToiletMaterialType(material_letrinas);
            setCisternType(tipo_aljibe);
            setPondType(tipo_laguna);
            setTankType(tipo_tanque);
            setDisposalSystemType(sistema_disposicion);
            setBoothType(tipo_caseta);
            setPipeType(tipo_canheria);
            setBoothMaterialType(material_caseta);
            setEnergyType(tipo_energia);
            setCisternLocation(ubicacion_aljibe);
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
        amendmentTypes,
        toiletMaterialType,
        cisternType,
        pondType,
        tankType,
        disposalSystemType,
        boothType,
        pipeType,
        boothMaterialType,
        energyType,
        cisternLocation,
    };

    return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
}

function useDomain() {
    return useContext(DomainContext);
}

export {useDomain};
