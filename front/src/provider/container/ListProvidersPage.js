import {ProviderService} from "provider/service";
import {useProviderTable} from "provider/data";
import {EntityListPage} from "base/entity/pages";
import {ProviderFilterForm} from "provider/presentational/form";

const ListProvidersPage = () => {
    const {tableColumns} = useProviderTable();

    return (
        <EntityListPage
            service={ProviderService.getAll}
            views={["table"]}
            entityName="prestadores"
            basePath="providers"
            tableColumns={tableColumns}
            filterForm={<ProviderFilterForm />}
        />
    );
};
export default ListProvidersPage;
