import {useAuth} from "base/user/provider";

import {TabPanel} from "base/ui/tab";
import {FieldReportProjectsTabPanelContent, FieldReportNewProjectTabPanel} from ".";

const FieldReportProjectsTabPanels = ({projects, value}) => {
    const {ROLES} = useAuth();

    const indexForNewTab = projects?.length;

    return (
        <>
            {projects?.map((project, index) => {
                console.log({project, index, value});
                return (
                    <TabPanel key={index} index={index} value={value}>
                        <FieldReportProjectsTabPanelContent project={project} />
                    </TabPanel>
                );
            })}
            <FieldReportNewProjectTabPanel index={indexForNewTab} value={value} />
        </>
    );
};

export default FieldReportProjectsTabPanels;
