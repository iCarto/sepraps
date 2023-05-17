import {
    createFinancingFunds,
    financing_funds_api_adapter,
    createFinancingPrograms,
    financing_programs_api_adapter,
} from "financing/model";
import {AuthApiService} from "base/api/service";

const basePathFinancingFunds = "/api/monitoring/financingfunds";
const basePathFinancingPrograms = "/api/monitoring/financingprograms";

const FinancingService = {
    getFinancingFunds() {
        return AuthApiService.get(basePathFinancingFunds).then(response => {
            return createFinancingFunds(financing_funds_api_adapter(response));
        });
    },

    getFinancingPrograms() {
        return AuthApiService.get(basePathFinancingPrograms).then(response => {
            return createFinancingPrograms(financing_programs_api_adapter(response));
        });
    },
};

export default FinancingService;
