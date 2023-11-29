import {useEffect, useState} from "react";
import {ProjectService} from "project/service";

export function useGetBuildingComponentTypes(projectId) {
    const [bcTypes, setBcTypes] = useState([]);

    useEffect(() => {
        ProjectService.getProjectBuildingComponentTypes(projectId).then(types => {
            const otherType = {value: "otro", label: "Otro"};
            setBcTypes([...types, otherType]);
        });
    }, [projectId]);

    return bcTypes;
}
