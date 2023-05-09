import {ProviderService} from "provider/service";
import {useProviderTable} from "provider/data";
import {useProviderLayer} from "provider/geo";
import {EntityListPage} from "base/entity/pages";
import {ProviderFilterForm} from "provider/presentational/form";

const ListProvidersPage = () => {
    const {tableColumns} = useProviderTable();

    return (
        <EntityListPage
            service={ProviderService.getAll}
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
