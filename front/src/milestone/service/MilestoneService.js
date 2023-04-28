import {createMilestone, milestone_api_adapter} from "milestone/model";
import {AuthApiService} from "../../base/api/service";

const basePath = "/api/monitoring/milestones";

const MilestoneService = {
    getMilestone(id) {
        return AuthApiService.get(basePath + "/" + id).then(response => {
            return createMilestone(milestone_api_adapter(response));
        });
    },

    updateMilestone(milestone) {
        return AuthApiService.put(basePath + "/" + milestone.id, milestone).then(
            response => {
                return createMilestone(milestone_api_adapter(response));
            }
        );
    },
};

export default MilestoneService;
