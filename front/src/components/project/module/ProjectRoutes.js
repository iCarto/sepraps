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
} from "components/project/container";
import {UpdateProjectProviderContactPanel} from "components/provider/container";
import {UpdateMilestonePanel, ViewMilestonePanel} from "components/milestone/container";
import {AddProjectContractPanel} from "components/contracts/container";

const projectRoutes = [
    <Route key="project-new" path="new" element={<CreateProjectPage />} />,
    <Route key="project-detail" path=":id" element={<ViewProjectPage />}>
        <Route
            key="project-location"
            path="location"
            element={<ViewProjectLocationSubPage />}
        >
            <Route
                key="project-provider"
                path="provider/:action"
                element={<UpdateProjectProviderPanel />}
            />
            <Route
                key="project-provider-contact-update"
                path="provider/contact/:contactId/:action"
                element={<UpdateProjectProviderContactPanel />}
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
        />
        <Route
            key="project-info"
            path=""
            element={<ViewProjectSummarySubPage />}
        ></Route>
    </Route>,
    <Route key="project-list" path="" element={<ListProjectsPage />} />,
];

export default projectRoutes;
