import {ProviderService} from "provider/service";
import {useProviderTableColumns} from "provider/data";
import {useProviderLayer} from "provider/geo";
import {EntityListPage} from "base/entity/components/container";
import {ProviderFilterForm} from "provider/presentational/form";

const ListProvidersPage = () => {
    const {tableColumns} = useProviderTableColumns();

    return (
        <EntityListPage
            service={ProviderService}
            views={["table", "map"]}
            mapLayer={useProviderLayer}
            entityName="prestadores"
            basePath="providers"
            tableColumns={tableColumns}
            filterForm={<ProviderFilterForm />}
        />
    );
};
export default ListProvidersPage;
