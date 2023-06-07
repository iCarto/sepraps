import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {useList} from "base/entity/hooks";
import {useAuth} from "base/user/provider";
import {
    EntityCardsList,
    EntityChangeView,
    EntityCreateButton,
    EntityListMap,
    EntityTable,
} from "base/entity/components/presentational";
import {EntityFilterForm} from "base/entity/components/form";
import {PageLayout} from "base/ui/main";
import {PaperContainer} from "base/shared/components";
import Grid from "@mui/material/Grid";

const EntityListPage = ({
    views = ["table", "map"],
    entityName,
    service,
    tableColumns,
    getCellProps = null,
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
                    getCellProps={getCellProps}
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
                    <Grid
                        item
                        container
                        spacing={2}
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item xs={8} xl={6} role="form">
                            {filterForm || <EntityFilterForm entityName={entityName} />}
                        </Grid>
                        <Grid
                            item
                            container
                            xs={4}
                            xl={6}
                            spacing={1}
                            direction={{xs: "column", lg: "row"}}
                            justifyContent="flex-end"
                            alignItems={{xs: "flex-end", lg: "flex-start"}}
                        >
                            {createButton ? (
                                <Grid item>
                                    <EntityCreateButton basePath={basePath} />
                                </Grid>
                            ) : null}
                            {views.length > 1 ? (
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
