import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {useList} from "base/entity/hooks";
import {useDialog} from "base/dialog/hooks";

import {AddNewButton, PaperContainer, Spinner} from "base/shared/components";
import {SectionHeading} from "base/ui/section/components";
import {MapProjects} from "base/map/components";
import {EntityChangeView, EntityListMap} from "base/entity/components/presentational";
import {
    ProjectSelectorDialog,
    ProjectsList,
    ProjectsTable,
} from "project/presentational";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {AlertError} from "base/error/components";
import {discriminators, useProjectLayer} from "project/geo";
import {ProjectService} from "project/service";

const ListContractProjects = ({
    contract,
    contractProjects,
    error = null,
    isLoading = false,
}) => {
    const {isDialogOpen, openDialog, closeDialog} = useDialog();

    const [selectedElement, setSelectedElement] = useState(null);

    const navigate = useNavigate();
    const {view} = useList();
    const {ROLES} = useAuth();

    const handleClickOnCard = projectId => {
        navigate(`info/${projectId}`);
    };

    const handleSelectProject = project => {
        setSelectedElement(project);
        navigate(`info/${project.id}`);
    };

    const handleSelectMapProject = projectId => {
        // TODO: review because for table and list selected element is the project object
        // and in map is project id
        setSelectedElement(projectId);
        navigate(`info/${projectId}`);
    };

    const getViewComponent = () => {
        if (view === "list") {
            return (
                <ProjectsList projects={contractProjects} onClick={handleClickOnCard} />
            );
        }
        if (view === "map") {
            return (
                <EntityListMap
                    service={ProjectService}
                    customLoader={ProjectService.getFeatures({
                        construction_contract: contract.id,
                    })}
                    layerHook={useProjectLayer}
                    layerDefaultDiscriminator={discriminators.PROJECT_TYPE}
                    selectedElement={selectedElement}
                    onSelectElement={handleSelectMapProject}
                />
            );
        }
        return (
            <ProjectsTable
                projects={contractProjects}
                selectedElement={selectedElement}
                onSelectElement={handleSelectProject}
            />
        );
    };

    return (
        <>
            <PaperContainer justifyContent="space-between" alignItems="center">
                <AlertError error={error} />
                <Grid
                    item
                    container
                    alignItems="flex-start"
                    justifyContent="space-between"
                    sx={{flexDirection: {xs: "column", md: "row"}}}
                    mb={3}
                >
                    <Grid item md={6}>
                        <SectionHeading>Proyectos del contrato</SectionHeading>
                    </Grid>
                    <Grid item md={6} sx={{mt: {xs: 2, md: 0}}}>
                        <Stack direction="row" justifyContent="flex-end" spacing={1}>
                            {!contract.is_supervision_contract && (
                                <AddNewButton
                                    roles={[ROLES.MANAGEMENT, ROLES.SUPERVISION]}
                                    onClick={openDialog}
                                />
                            )}
                            <EntityChangeView views={["list", "table", "map"]} />
                        </Stack>
                    </Grid>
                </Grid>
                {isLoading ? (
                    <Spinner />
                ) : contractProjects.length ? (
                    getViewComponent()
                ) : (
                    <Container sx={{textAlign: "center"}}>
                        <Typography py={12} sx={{fontStyle: "italic"}}>
                            Este contrato aún no tiene proyectos asignados.
                        </Typography>
                    </Container>
                )}
            </PaperContainer>

            {isDialogOpen ? (
                <ProjectSelectorDialog
                    isDialogOpen={isDialogOpen}
                    onCloseDialog={closeDialog}
                    contract={contract}
                    contractProjects={contractProjects}
                />
            ) : null}
        </>
    );
};

export default ListContractProjects;
