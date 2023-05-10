class Milestones extends Array {}

const milestone_api_adapter = milestone => {
    if (milestone["checklist"]) {
        milestone["checklist"] = milestone["checklist"]?.map(checkItem => checkItem);
    }
    return milestone;
};

const milestones_api_adapter = milestones => milestones.map(milestone_api_adapter);

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
    comments = "",
    ordering = "",
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
        comments,
        ordering,
    };

    return Object.freeze(publicApi);
};

export {
    createMilestone as default,
    createMilestones,
    milestone_api_adapter,
    milestones_api_adapter,
};
