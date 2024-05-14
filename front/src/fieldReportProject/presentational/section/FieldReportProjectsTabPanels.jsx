import {TabPanel} from "base/ui/tab/components";
import {FieldReportProjectsTabPanelContent, FieldReportNewProjectTabPanel} from ".";
import {UserAuthRequired} from "base/user/utilities";

const FieldReportProjectsTabPanels = ({fieldReport, activeTabId}) => {
    return (
        <>
            {fieldReport.field_report_projects?.map((fieldReportProject, index) => {
                return (
                    <TabPanel
                        key={fieldReportProject.id}
                        index={fieldReportProject.id}
                        visible={
                            fieldReportProject.id === activeTabId ||
                            (activeTabId === 0 && index === 0)
                        }
                    >
                        <FieldReportProjectsTabPanelContent
                            fieldReportProject={fieldReportProject}
                        />
                    </TabPanel>
                );
            })}
            <UserAuthRequired user={fieldReport.created_by}>
                <FieldReportNewProjectTabPanel index={-1} activeTabId={activeTabId} />
            </UserAuthRequired>
        </>
    );
};

export default FieldReportProjectsTabPanels;
