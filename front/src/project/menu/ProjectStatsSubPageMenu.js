import {SubPageMenu, SubPageMenuListItemButton} from "base/ui/menu";

import LinearScaleIcon from "@mui/icons-material/LinearScale";

const ProjectStatsSubPageMenu = () => {
    const basePath = "/projects/stats";

    return (
        <SubPageMenu headerTitle="Estadísticas" headerText="Proyectos">
            <SubPageMenuListItemButton
                key="providers-list"
                to={`${basePath}/phase`}
                text="Fases"
                icon={<LinearScaleIcon />}
            />
        </SubPageMenu>
    );
};

export default ProjectStatsSubPageMenu;
