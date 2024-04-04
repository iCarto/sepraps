import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {EntityViewSubPage} from "base/entity/components/container";
import {MapConfigProvider} from "base/geo/provider";
import {ProjectService} from "project/service";
import {ListFinancingProgramProjects} from ".";

const ViewFinancingProgramProjectsSubPage = () => {
    const [financingProgram] = useOutletContext();

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        ProjectService.getList({financing_program: financingProgram.id})
            .then(projects => {
                setProjects(projects);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError(error);
            });
    }, [financingProgram]);

    const sections = [
        <MapConfigProvider>
            <ListFinancingProgramProjects
                financingProgram={financingProgram}
                projects={projects}
                error={error}
                isLoading={isLoading}
            />
        </MapConfigProvider>,
    ];

    return financingProgram && <EntityViewSubPage sections={sections} />;
};

export default ViewFinancingProgramProjectsSubPage;
