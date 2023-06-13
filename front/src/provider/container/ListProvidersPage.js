import {ProviderService} from "provider/service";
import {useProviderTableColumns} from "provider/data";
import {EntityListPage} from "base/entity/components/container";
import {ProviderFilterForm} from "provider/presentational/form";

const ListProvidersPage = () => {
    const {tableColumns} = useProviderTableColumns();

    return (
        <EntityListPage
            views={["table"]}
            entityName="Prestadores"
            service={ProviderService}
            tableColumns={tableColumns}
            filterForm={<ProviderFilterForm />}
            basePath="providers"
        />
    );
};
export default ListProvidersPage;
