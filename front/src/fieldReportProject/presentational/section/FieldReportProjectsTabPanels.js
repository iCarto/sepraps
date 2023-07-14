import {TabPanel} from "base/ui/tab";
import {FieldReportProjectsTabPanelContent, FieldReportNewProjectTabPanel} from ".";

const FieldReportProjectsTabPanels = ({fieldReportProjects, activeTabId}) => {
    return (
        <>
            {fieldReportProjects?.map((fieldReportProject, index) => {
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
            <FieldReportNewProjectTabPanel index={-1} activeTabId={activeTabId} />
        </>
    );
};

export default FieldReportProjectsTabPanels;
