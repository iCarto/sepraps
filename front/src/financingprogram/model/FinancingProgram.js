import {
    createFinancingFunds,
    financing_funds_api_adapter,
} from "financingprogram/model";

class FinancingPrograms extends Array {}

const financing_program_api_adapter = financing_program => {
    if (financing_program["financing_funds"]) {
        financing_program["financing_funds"] = createFinancingFunds(
            financing_funds_api_adapter(financing_program["financing_funds"])
        );
    }
    return financing_program;
};

const financing_programs_api_adapter = financing_programs =>
    financing_programs.map(financing_program_api_adapter);

const createFinancingPrograms = (data = []) => {
    const financing_programs = FinancingPrograms.from(data, financing_program =>
        createFinancingProgram(financing_program)
    );
    return financing_programs;
};

const createFinancingProgram = ({
    id = null,
    short_name = "",
    name = "",
    financing_funds = [],
} = {}) => {
    const publicApi = {
        id,
        short_name,
        name,
        financing_funds,
    };

    return Object.freeze(publicApi);
};

export {
    createFinancingProgram as default,
    createFinancingPrograms,
    financing_program_api_adapter,
    financing_programs_api_adapter,
};
