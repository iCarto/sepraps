import {FieldReportService} from "fieldReport/service";
import {useFieldReportsTableColumns} from "fieldReport/data";
import {EntityListPage} from "base/entity/components/container";
import {useMenuGenericDeleteAction} from "base/ui/menu/hooks";
import {FieldReportFilterForm} from "fieldReport/presentational/form";

const ListFieldReportsPage = () => {
    const {tableColumns} = useFieldReportsTableColumns();

    const {action: deleteAction, dialog: deleteDialog} = useMenuGenericDeleteAction(
        element => FieldReportService.delete(element.id)
    );

    return (
        <>
            {deleteDialog}
            <EntityListPage
                views={["table"]}
                entityName="Informes de viaje"
                service={FieldReportService}
                tableColumns={tableColumns}
                filterForm={<FieldReportFilterForm />}
                basePath="field-reports"
                elementActions={[deleteAction]}
                downloadOptions={["csv"]}
            />
        </>
    );
};
export default ListFieldReportsPage;
