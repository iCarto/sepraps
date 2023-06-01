import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import Grid from "@mui/material/Grid";
import {Stack} from "@mui/material";
import {
    EntityCardsList,
    EntityChangeView,
    EntityCreateButton,
    EntityListMap,
    EntityTable,
} from "../presentational";
import {useAuth} from "base/user/provider";
import {useNavigateWithReload} from "base/navigation/hooks";
import {useList} from "base/entity/hooks";
import {PageLayout} from "base/ui/main";
import {PaperContainer} from "base/shared/components";
import {EntityFilterForm} from "../form";

const EntityListPage = ({
    views = ["table", "map"],
    entityName,
    service,
    tableColumns,
    card = null,
    mapLayer = null,
    filterForm = null,
    createButton = true,
    elementActions = null,
    basePath = null,
    subPage = true,
}) => {
    const {ROLES} = useAuth();
    const navigate = useNavigateWithReload();
    const {idInfoPanel} = useParams();

    const {view, filter} = useList();

    const [selectedElement, setSelectedElement] = useState(null);

    const handleSelectElement = elementId => {
        setSelectedElement(elementId);
        navigate(`info/${elementId}`);
    };

    useEffect(() => {
        // If the sidebar panel is open we must highlight the element
        setSelectedElement(idInfoPanel ? parseInt(idInfoPanel) : null);
    }, [idInfoPanel]);

    const getViewComponent = () => {
        if (view === "list") {
            return (
                <EntityCardsList
                    service={service}
                    entityCard={card}
                    onSelectElement={handleSelectElement}
                />
            );
        }
        if (view === "table") {
            return (
                <EntityTable
                    columns={tableColumns}
                    service={service}
                    selectedElement={selectedElement}
                    onSelectElement={handleSelectElement}
                    elementActions={elementActions}
                />
            );
        }
        if (view === "map") {
            return (
                <EntityListMap
                    layer={mapLayer}
                    service={service}
                    selectedElement={selectedElement}
                    onSelectElement={handleSelectElement}
                />
            );
        }
        return null;
    };

    return (
        filter && (
            <PageLayout subPage={subPage}>
                <PaperContainer>
                    <Grid item container alignItems="center" xs={12}>
                        <Grid item xs={6}>
                            {filterForm || <EntityFilterForm entityName={entityName} />}
                        </Grid>
                        <Grid item container xs={6} justifyContent="flex-end">
                            <Stack direction="row" spacing={2}>
                                {createButton ? (
                                    <EntityCreateButton basePath={basePath} />
                                ) : null}
                                {views.length > 1 ? (
                                    <EntityChangeView views={views} />
                                ) : null}
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{mt: 3}}>
                        {getViewComponent()}
                    </Grid>
                </PaperContainer>
            </PageLayout>
        )
    );
};
export default EntityListPage;
