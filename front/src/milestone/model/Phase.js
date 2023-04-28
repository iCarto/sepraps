import {createMilestones, milestones_api_adapter} from "./Milestone";

class Phases extends Array {}

const phase_api_adapter = phase => {
    if (phase["milestones"]) {
        phase["milestones"] = createMilestones(
            milestones_api_adapter(phase["milestones"])
        );
    }
    return phase;
};

const phases_api_adapter = phases => phases.map(phase_api_adapter);

const createPhases = (data = []) => {
    const phases = Phases.from(data, phase => createPhase(phase));
    return phases;
};

const createPhase = ({code = null, name = "", milestones = []} = {}) => {
    const publicApi = {
        code,
        name,
        milestones,
    };

    return Object.freeze(publicApi);
};

export {createPhase as default, createPhases, phase_api_adapter, phases_api_adapter};
