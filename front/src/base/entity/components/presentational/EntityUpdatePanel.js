import {AlertError} from "base/error/components";
import {SidebarPanelLayout} from "base/ui/sidebar";

const EntityUpdatePanel = ({form, title, error = null, onCancel}) => {
    return (
        <SidebarPanelLayout sidebarTitle={title} closeSidebarClick={onCancel}>
            {error && <AlertError error={error} />}
            {form}
        </SidebarPanelLayout>
    );
};

export default EntityUpdatePanel;
