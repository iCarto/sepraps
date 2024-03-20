import {CUSTOM_COLORS} from "Theme";

const ContractServiceUtil = {
    getExecutionStartDateLabel(services) {
        // if servicio de ejecución de obra, always use his label
        if (services?.length > 0) {
            const buildingExecution = services.find(
                service => service.code === "ejecucion_de_obra"
            );
            if (buildingExecution && buildingExecution.labels?.executionStartDate) {
                return buildingExecution.labels?.executionStartDate;
            }
            if (services[0].labels?.executionStartDate) {
                return services[0].labels?.executionStartDate;
            }
        }
        return "Fecha de inicio del contrato";
    },
    getContractServiceColor(serviceTypes, serviceLabel) {
        const colors = CUSTOM_COLORS.contract_service;

        const servicesWithColors = serviceTypes.map((serviceType, index) => ({
            ...serviceType,
            color: colors[index] || CUSTOM_COLORS.contract_service.default,
        }));

        const serviceColor = servicesWithColors.find(
            service => service.label === serviceLabel.trim()
        )?.color;

        return serviceColor;
    },
};

export default ContractServiceUtil;
