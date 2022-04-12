import {useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";

import {useProjectListView} from "components/project/provider";
import {SubPageLayout} from "layout";
import {
    AddProjectButton,
    ProjectList,
    ProjectListChangeView,
    ProjectsTable,
} from "components/project/presentational";
import {SectionHeading} from "components/common/presentational";
import {MapProjects} from "components/common/geo";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const ViewContractProjectsSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    const [selectedElement, setSelectedElement] = useState(null);

    const {view} = useProjectListView();

    const navigate = useNavigate();

    const handleClickOnCard = projectId => {
        navigate(`project/${projectId}`);
    };

    const onSelectProject = project => {
        setSelectedElement(project);
        navigate(`info/${project.id}`);
    };

    const getViewComponent = view => {
        if (view === "map") {
            return (
                <MapProjects
                    projects={contract.projects}
                    selectedElement={selectedElement}
                    onSelectElement={onSelectProject}
                />
            );
        }
        if (view === "list") {
            return (
                <ProjectList projects={contract.projects} onClick={handleClickOnCard} />
            );
        }
        return (
            <ProjectsTable
                projects={contract.projects}
                selectedElement={selectedElement}
                onSelectElement={onSelectProject}
            />
        );
    };

    return (
        <SubPageLayout outletContext={[contract]}>
            <Paper sx={{p: 3}}>
                <Stack direction="row" justifyContent="space-between" sx={{mb: 3}}>
                    <SectionHeading>Proyectos del contrato</SectionHeading>
                    <Stack direction="row" justifyContent="flex-end">
                        <AddProjectButton
                            basePath={`/contracts/${contract.id}/projects`}
                        />
                        <ProjectListChangeView />
                    </Stack>
                </Stack>
                {getViewComponent(view)}
            </Paper>
        </SubPageLayout>
    );
};

export default ViewContractProjectsSubPage;
