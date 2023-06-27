import {useAuth} from "base/user/provider";

import {TabPanel} from "base/ui/tab";
import {FieldReportNewProjectTabPanel, FieldReportProjectsTabPanelContent} from ".";

const FieldReportProjectsTabPanels = ({projects, value}) => {
    const {ROLES} = useAuth();

    const indexForNewTab = projects?.length;

    return (
        <>
            {projects?.map((project, index) => (
                <TabPanel key={index} value={value} index={index}>
                    <FieldReportProjectsTabPanelContent project={project} />
                </TabPanel>
            ))}
            <FieldReportNewProjectTabPanel index={indexForNewTab} value={value} />
        </>
    );
};

export default FieldReportProjectsTabPanels;
