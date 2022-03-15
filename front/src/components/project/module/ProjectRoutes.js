import {Route} from "react-router-dom";
import {
    ListProjectsPage,
    CreateProjectPage,
    ViewProjectPage,
    ViewProjectSummarySubPage,
    ViewProjectLocationSubPage,
    ViewProjectFinancingSubPage,
    ViewProjectMilestonesSubPage,
    ViewProjectContactsSubPage,
    UpdateProjectProviderPanel,
    ViewProjectDocumentsSubPage,
    AddProjectProviderPanel,
    UpdateProjectPanel,
    UpdateProjectMainInfrastructurePanel,
    UpdateProjectFinancingPanel,
    UpdateProjectLinkedLocalitiesPanel,
} from "components/project/container";
import {UpdateProjectProviderContactPanel} from "components/provider/container";
import {UpdateMilestonePanel, ViewMilestonePanel} from "components/milestone/container";
import {AddProjectContractPanel} from "components/contracts/container";
import {ViewDocumentPanel} from "components/document/container";

const projectRoutes = [
    <Route key="project-new" path="new" element={<CreateProjectPage />} />,
    <Route key="project-detail" path=":id" element={<ViewProjectPage />}>
        <Route key="project-info" path="" element={<ViewProjectSummarySubPage />}>
            <Route
                key="project-general-data"
                path="edit"
                element={<UpdateProjectPanel />}
            />
        </Route>
        <Route
            key="project-location"
            path="location"
            element={<ViewProjectLocationSubPage />}
        >
            <Route
                key="project-provider-update"
                path="provider/:providerId/:action"
                element={<UpdateProjectProviderPanel />}
            />
            <Route
                key="project-provider-new-add"
                path="provider/new/:action"
                element={<AddProjectProviderPanel />}
            />
            <Route
                key="project-provider-contact-update"
                path="provider/contact/:contactId/:action"
                element={<UpdateProjectProviderContactPanel />}
            />
            <Route
                key="project-provider-contact-update"
                path="provider/contact/:contactId/:action"
                element={<UpdateProjectProviderContactPanel />}
            />
            <Route
                key="project-main-infrastructure-edit"
                path="main_infrastructure/edit"
                element={<UpdateProjectMainInfrastructurePanel />}
            />
            <Route
                key="project-linked-localities-update"
                path="linked_localities/:localityCode/:action"
                element={<UpdateProjectLinkedLocalitiesPanel />}
            />
        </Route>
        <Route
            key="project-financing"
            path="financing"
            element={<ViewProjectFinancingSubPage />}
        >
            <Route
                key="project-contract-update"
                path="contract/:contractId/:action"
                element={<AddProjectContractPanel />}
            />
            <Route
                key="project-financing-data"
                path=":action"
                element={<UpdateProjectFinancingPanel />}
            />
        </Route>
        <Route
            key="project-milestones"
            path="milestones"
            element={<ViewProjectMilestonesSubPage />}
        >
            <Route
                key="project-milestones-edit"
                path=":milestoneId/edit"
                element={<UpdateMilestonePanel />}
            />
            <Route
                key="project-milestones-view"
                path=":milestoneId"
                element={<ViewMilestonePanel />}
            />
        </Route>
        <Route
            key="project-contacts"
            path="contacts"
            element={<ViewProjectContactsSubPage />}
        />
        <Route
            key="project-documents"
            path="documents/*"
            element={<ViewProjectDocumentsSubPage />}
        >
            <Route
                key="project-documents-view"
                path="detail/*"
                element={<ViewDocumentPanel />}
            />
        </Route>
        <Route key="project-info" path="" element={<ViewProjectSummarySubPage />} />
    </Route>,
    <Route key="project-list" path="" element={<ListProjectsPage />} />,
];

export default projectRoutes;
