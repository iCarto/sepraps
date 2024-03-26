import {
    createFinancingProgram,
    createFinancingPrograms,
    financing_program_api_adapter,
    financing_programs_api_adapter,
} from "financingprogram/model";
import {createEntityService} from "base/entity/service";

const basePath = "/api/app/financingprograms";

const entityService = createEntityService(
    basePath,
    createFinancingProgram,
    createFinancingPrograms,
    financing_program_api_adapter,
    financing_programs_api_adapter
);

const FinancingProgramService = {
    getList(filter, sort, order, format = null) {
        return entityService.getList(filter, null, sort, order, format);
    },

    getPaginatedList(filter, page, sort, order) {
        return entityService.getList(filter, page, sort, order);
    },

    get(id) {
        return entityService.get(id);
    },
};

export default FinancingProgramService;
