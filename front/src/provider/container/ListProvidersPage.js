import {EntityListPage} from "base/entity/pages";
import {useProviderTable} from "provider/data";
import {ProviderFilterForm} from "provider/presentational/form";
import {ProviderService} from "provider/service";

const ListProvidersPage = () => {
    const {tableColumns} = useProviderTable();

    return (
        <EntityListPage
            views={["table"]}
            entityName="prestadores"
            basePath="providers"
            service={ProviderService.getAll}
            tableColumns={tableColumns}
            filterForm={<ProviderFilterForm />}
        />
    );
};
export default ListProvidersPage;
