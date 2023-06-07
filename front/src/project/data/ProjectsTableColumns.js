import {MilestoneTimelineShort} from "milestone/presentational";

export function useProjectTable() {
    const tableColumns = [
        {
            id: "name",
            label: "Localidad",
            width: 15,
        },
        {
            id: "code",
            label: "Código",
            width: 15,
        },
        {
            id: "location",
            label: "Ubicación",
            width: 20,
        },
        {
            id: "description",
            label: "Descripción",
            width: 25,
        },
        {
            id: "milestones",
            label: "Estado",
            formatFunction: item => {
                return <MilestoneTimelineShort milestones={item.milestones} />;
            },
            width: 25,
        },
    ];

    const getCellProps = item => {
        if (item.closed) return {sx: {opacity: 0.5}};
        return {};
    };

    return {tableColumns, getCellProps};
}
