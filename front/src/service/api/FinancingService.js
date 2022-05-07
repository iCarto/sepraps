import {createFinancingPrograms, financing_programs_api_adapter} from "model";
import AuthApiService from "./AuthApiService";

const basePathFinancingFunds = "/api/monitoring/financingfunds";
const basePathFinancingPrograms = "/api/monitoring/financingprograms";

const FinancingService = {
    getFinancingFunds() {
        return AuthApiService.get(basePathFinancingFunds).then(response => {
            return response.map(financingFund => {
                return {
                    value: financingFund.id,
                    label: financingFund.name,
                };
            });
        });
    },

    getFinancingPrograms() {
        return AuthApiService.get(basePathFinancingPrograms).then(response => {
            return createFinancingPrograms(financing_programs_api_adapter(response));
        });
    },
};

export default FinancingService;
