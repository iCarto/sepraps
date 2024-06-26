import {ProviderService} from "provider/service";
import {useProviderTableColumns} from "provider/data";
import {EntityListPage} from "base/entity/components/container";
import {ProviderFilterForm} from "provider/presentational/form";
import {useMenuGenericDeleteAction} from "base/ui/menu/hooks";

const ListProvidersPage = () => {
    const {tableColumns} = useProviderTableColumns();

    const {action: deleteAction, dialog: deleteDialog} = useMenuGenericDeleteAction(
        element => ProviderService.delete(element.id)
    );

    return (
        <>
            {deleteDialog}
            <EntityListPage
                views={["table"]}
                entityName="Prestadores"
                service={ProviderService}
                tableColumns={tableColumns}
                filterForm={<ProviderFilterForm />}
                basePath="providers"
                elementActions={[deleteAction]}
                downloadOptions={["csv"]}
            />
        </>
    );
};
export default ListProvidersPage;
