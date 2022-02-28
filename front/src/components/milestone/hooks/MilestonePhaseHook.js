export function usePhaseMilestone() {
    let getMilestonePhase = (milestone = null) => {
        if (["funding_allocation", "approval_technical_folder"].includes(milestone)) {
            return "phaseOne";
        }
        if (
            [
                "call_for_tenders_works_contract",
                "award_works_contract",
                "contract_signing",
            ].includes(milestone)
        ) {
            return "phaseTwo";
        }
        if (
            [
                "start_of_works",
                "technical_validation",
                "definitive_reception",
                "system_delivery",
                "final_settlement",
            ].includes(milestone)
        ) {
            return "phaseThree";
        }
        if (["end_of_warranty"].includes(milestone)) {
            return "phaseFour";
        }
        return "other";
    };

    return getMilestonePhase;
}
