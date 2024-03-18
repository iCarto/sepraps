import {useState} from "react";

import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {useAuth} from "base/user/provider";

import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {
    ProjectBasicDataFields,
    ProjectGeneralDataSection,
} from "project/presentational/section";
import {ProjectForm, ProjectFormGeneralDataFields} from "project/presentational/form";
import EditIcon from "@mui/icons-material/Edit";

const ViewOrUpdateProjectSummaryContent = ({project}) => {
    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

    const handleFormSubmit = project => {
        ProjectService.update(project_view_adapter({...project}))
            .then(updatedProject => {
                setMode("view");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const isProjectClosed = project?.closed;

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                setMode("edit");
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    const getComponent = mode => {
        if (mode === "view") {
            return <ProjectBasicDataFields project={project} />;
        }
        if (mode === "edit") {
            return (
                <ProjectForm
                    project={project}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                >
                    <ProjectFormGeneralDataFields />
                </ProjectForm>
            );
        }
    };

    const component = getComponent(mode);

    return (
        <SectionCard
            headingLabel={false}
            secondaryActions={!isProjectClosed && secondaryActions}
        >
            {
                <ProjectGeneralDataSection
                    project={project}
                    basicDataComponent={component}
                />
            }
        </SectionCard>
    );
};

export default ViewOrUpdateProjectSummaryContent;
