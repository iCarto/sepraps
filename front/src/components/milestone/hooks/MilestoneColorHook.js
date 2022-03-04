const phaseColors = {
    other: "#ff0a0a",
    design: "#ff9800",
    contracting: "#ffeb3b",
    execution: "#cddc39",
    "post-execution": "#8bc34a",
};

export function useColorMilestone() {
    let getMilestoneColor = (milestone = null) => {
        if (["funding_allocation", "approval_technical_folder"].includes(milestone)) {
            return phaseColors["design"];
        }
        if (
            [
                "call_for_tenders_works_contract",
                "award_works_contract",
                "contract_signing",
            ].includes(milestone)
        ) {
            return phaseColors["contracting"];
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
            return phaseColors["execution"];
        }
        if (["end_of_warranty"].includes(milestone)) {
            return phaseColors["post-execution"];
        }
        return phaseColors["other"];
    };

    return getMilestoneColor;
}
