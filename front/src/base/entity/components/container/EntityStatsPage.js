import {SectionCard} from "base/ui/section/components";
import {ContentLayout} from "base/ui/main";
import Grid from "@mui/material/Grid";
import {StatsTable} from "stats/presentational";

const EntityStatsPage = ({stats, tables}) => {
    return (
        <ContentLayout>
            <Grid container spacing={1}>
                {tables.map((table, index) => {
                    return (
                        <Grid item xs={12} key={index}>
                            <SectionCard title={table.tableTitle}>
                                <StatsTable
                                    tableColumns={table.tableColumns}
                                    elements={stats}
                                />
                            </SectionCard>
                        </Grid>
                    );
                })}
            </Grid>
        </ContentLayout>
    );
};
export default EntityStatsPage;
