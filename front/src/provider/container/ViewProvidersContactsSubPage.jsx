import {useCallback, useEffect, useState} from "react";

import {StatsService} from "stats/service";
import {StatsFilterProvider} from "stats/provider";

import {useProvidersContactsTable} from "provider/data/ProvidersContactsTableColumns";

import {SectionCard} from "base/ui/section/components";
import {EntityViewSubPage} from "base/entity/components/container";
import {Spinner} from "base/shared/components";
import {StatsFilterForm} from "stats/presentational";
import {ContactsTable} from "contact/presentational";
import {EntityNoItemsComponent} from "base/entity/components/presentational";

const ViewProvidersContactsSubPage = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        StatsService.getStatsProviderContacts(filter).then(data => {
            setData(data);
            setIsLoading(false);
        });
    }, [filter]);

    const handleFilterChange = useCallback(
        attributeValue => {
            setFilter({...filter, ...attributeValue});
        },
        [filter, setFilter]
    );

    const handleFilterClear = () => {
        setFilter({});
    };

    const {tableColumns} = useProvidersContactsTable();

    const noElements = !data.length;
    const isFilterEmpty = Object.values(filter).every(value => !value);

    const sections = [
        <SectionCard title={`Miembros de las Comisiones Directivas (${data?.length})`}>
            <StatsFilterForm
                filter={filter}
                views={["administrativeDivisions"]}
                onChange={handleFilterChange}
                onClear={handleFilterClear}
            />
            {isLoading ? (
                <Spinner />
            ) : noElements ? (
                <EntityNoItemsComponent isFilterEmpty={isFilterEmpty} />
            ) : (
                <ContactsTable contacts={data} customTableColumns={tableColumns} />
            )}
        </SectionCard>,
    ];

    return (
        <StatsFilterProvider>
            <EntityViewSubPage sections={sections} />
        </StatsFilterProvider>
    );
};

export default ViewProvidersContactsSubPage;
