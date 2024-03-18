import {useState} from "react";

import {ProjectService} from "project/service";
import {project_view_adapter} from "project/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {useAuth} from "base/user/provider";

import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {ProjectProviderSection} from "project/presentational/section";
import {ProjectForm} from "project/presentational/form";
import {ProviderFormSearch} from "provider/presentational/form";
import EditIcon from "@mui/icons-material/Edit";
import LinkOffIcon from "@mui/icons-material/LinkOff";

const ViewOrUpdateProjectProviderContent = ({project}) => {
    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();
    const provider = project.provider;

    const [selectedProvider, setSelectedProvider] = useState(null);
    const [mode, setMode] = useState("view");
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [error, setError] = useState(null);

    const handleFormSubmit = () => {
        ProjectService.update(
            project_view_adapter({...project, provider: selectedProvider})
        )
            .then(updatedProject => {
                setMode("view");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleSelectProvider = provider => {
        setSelectedProvider(provider);
    };

    const isProjectClosed = project?.closed;

    const secondaryActions = provider?.id
        ? [
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
              <SectionCardHeaderAction
                  key="remove"
                  name="remove"
                  text="Quitar"
                  icon={<LinkOffIcon />}
                  onClick={() => {
                      setIsRemoveDialogOpen(true);
                  }}
                  roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
              />,
          ]
        : null;

    const handleClickNew = () => {
        setMode("edit");
    };

    const getComponent = mode => {
        if (mode === "view") {
            return (
                <ProjectProviderSection
                    project={project}
                    isRemoveDialogOpen={isRemoveDialogOpen}
                    onClickNew={handleClickNew}
                    onCloseDialog={() => setIsRemoveDialogOpen(false)}
                />
            );
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
                    <ProviderFormSearch onClickSelected={handleSelectProvider} />
                </ProjectForm>
            );
        }
    };

    return (
        <SectionCard
            title="Prestador de servicios"
            secondaryActions={!isProjectClosed && secondaryActions}
        >
            {getComponent(mode)}
        </SectionCard>
    );
};

export default ViewOrUpdateProjectProviderContent;
