import {theme} from "Theme";

export function useColorMilestone() {
    let getMilestoneColor = (milestone = null) => {
        if (["funding_allocation", "approval_technical_folder"].includes(milestone)) {
            return theme.palette["design"].main;
        }
        if (
            [
                "call_for_tenders_works_contract",
                "award_works_contract",
                "contract_signing",
            ].includes(milestone)
        ) {
            return theme.palette["contracting"].main;
        }
        if (
            [
                "start_of_works",
                "technical_validation",
                "final_reception",
                "system_delivery",
                "final_settlement",
            ].includes(milestone)
        ) {
            return theme.palette["execution"].main;
        }
        if (["end_of_warranty"].includes(milestone)) {
            return theme.palette["post-execution"].main;
        }
        return theme.palette["other"].main;
    };

    return getMilestoneColor;
}
