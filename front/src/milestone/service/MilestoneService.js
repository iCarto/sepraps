import {createMilestone, milestone_api_adapter} from "milestone/model";
import {AuthApiService} from "base/api/service";

const basePath = "/api/app/milestones";

const MilestoneService = {
    get(id) {
        return AuthApiService.get(basePath + "/" + id).then(response => {
            return createMilestone(milestone_api_adapter(response));
        });
    },

    update(milestone) {
        return AuthApiService.put(basePath + "/" + milestone.id, milestone).then(
            response => {
                return createMilestone(milestone_api_adapter(response));
            }
        );
    },
};

export default MilestoneService;
