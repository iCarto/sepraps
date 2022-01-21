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
            return response.map(financingProgram => {
                return {
                    value: financingProgram.id,
                    label: financingProgram.name,
                    financing_fund: financingProgram.financing_fund,
                };
            });
        });
    },
};

export default FinancingService;
