import {DateUtil, DATE_FORMATS} from "utilities";

class Milestones extends Array {}

const milestone_api_adapter = milestone => {
    milestone["compliance_date"] = milestone["compliance_date"]
        ? new Date(milestone["compliance_date"])
        : null;
    if (milestone["children"]) {
        milestone["children"] = createMilestones(
            milestones_api_adapter(milestone["children"])
        );
    }
    if (milestone["checklist"]) {
        milestone["checklist"] = milestone["checklist"]?.map(checkItem => checkItem);
    }
    return milestone;
};

const milestones_api_adapter = milestones => milestones.map(milestone_api_adapter);

const milestone_view_adapter = milestone => {
    milestone["compliance_date"] = !!milestone["compliance_date"]
        ? DateUtil.formatDate(
              milestone["compliance_date"],
              DATE_FORMATS.SERVER_DATEFORMAT
          )
        : null;

    return milestone;
};

const createMilestones = (data = []) => {
    const milestones = Milestones.from(data, milestone => createMilestone(milestone));
    return milestones;
};

const createMilestone = ({
    id = null,
    code = "",
    name = "",
    short_name = "",
    checklist = [],
    phase = "",
    phase_name = "",
    compliance_date = "",
    ordering = "",
    children = [],
} = {}) => {
    const publicApi = {
        id,
        code,
        name,
        short_name,
        checklist,
        phase,
        phase_name,
        compliance_date,
        ordering,
        children,
    };

    return Object.freeze(publicApi);
};

export {
    createMilestone as default,
    createMilestones,
    milestone_api_adapter,
    milestones_api_adapter,
    milestone_view_adapter,
};
