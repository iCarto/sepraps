export function usePhaseMilestone() {
    let getMilestonePhase = (milestone = null) => {
        if (["funding_allocation", "approval_technical_folder"].includes(milestone)) {
            return "design";
        }
        if (
            [
                "call_for_tenders_works_contract",
                "award_works_contract",
                "contract_signing",
            ].includes(milestone)
        ) {
            return "contracting";
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
            return "execution";
        }
        if (["end_of_warranty"].includes(milestone)) {
            return "post-execution";
        }
        return "other";
    };

    return getMilestonePhase;
}
