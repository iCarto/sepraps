import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {useList} from "base/entity/hooks";
import {useNavigateWithReload} from "base/navigation/hooks";
import {
    EntityCardsList,
    EntityChangeView,
    EntityCreateButton,
    EntityTable,
    EntityListMap,
} from "base/entity/components/presentational";
import {EntityFilterForm} from "base/entity/components/form";
import {PageLayout} from "base/ui/main";
import {PaperContainer} from "base/shared/components";
import {AuthAction} from "base/user/components";

import Grid from "@mui/material/Grid";

const EntityListPage = ({
    views = ["table", "map"],
    entityName,
    service,
    basePath = "",
    tableColumns = [],
    highlightItems = null,
    card = null,
    mapLayer = null,
    filterForm = null,
    deleteService = null,
    createButton = true,
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
                    highlightItems={highlightItems}
                    selectedElement={selectedElement}
                    onSelectElement={handleSelectElement}
                    showDetailAction={false}
                    showEditAction={false}
                    showDeleteAction={false}
                    deleteService={deleteService}
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
                <PaperContainer justifyContent="space-between" alignItems="center">
                    <Grid
                        item
                        container
                        spacing={2}
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item xs={8} role="form">
                            {filterForm || <EntityFilterForm entityName={entityName} />}
                        </Grid>
                        <Grid
                            item
                            container
                            xs={4}
                            spacing={1}
                            direction={{xs: "column", lg: "row"}}
                            justifyContent="flex-end"
                            alignItems={{xs: "flex-end", lg: "flex-start"}}
                        >
                            {createButton ? (
                                <Grid item>
                                    <AuthAction roles={[]}>
                                        <EntityCreateButton basePath={basePath} />
                                    </AuthAction>
                                </Grid>
                            ) : null}
                            {views.length ? (
                                <Grid item>
                                    <EntityChangeView views={views} />
                                </Grid>
                            ) : null}
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
