import {useLocation} from "react-router-dom";

import {PageMenu, PageMenuListItemButton} from "base/ui/menu";

import ListIcon from "@mui/icons-material/List";

const FinancingProgramPageMenu = () => {
    const location = useLocation();
    const currentUrl = location.pathname;
    const entityUrlSlug = "financingprograms";
    const basePath = currentUrl.split(`/${entityUrlSlug}/`)[0];

    return (
        <PageMenu collapsed={true}>
            <PageMenuListItemButton
                key="financingprograms-list"
                to={`${basePath}/${entityUrlSlug}/list`}
                text="Listado"
                icon={<ListIcon />}
            />
        </PageMenu>
    );
};

export default FinancingProgramPageMenu;
