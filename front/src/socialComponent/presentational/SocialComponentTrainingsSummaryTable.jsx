import {useTrainingSummaryTable} from "socialComponent/data";
import {SimpleTable} from "base/table/components";

const SocialComponentTrainingsSummaryTable = ({trainings}) => {
    const {tableColumns} = useTrainingSummaryTable();

    // TO-DO: These calculations should come from the endpoint ?
    const totals = trainings.reduce(
        (accumulator, training) => {
            accumulator.number_of_men += training.number_of_men || 0;
            accumulator.number_of_women += training.number_of_women || 0;
            accumulator.number_of_hours += training.number_of_hours || 0;
            return accumulator;
        },
        {number_of_men: 0, number_of_women: 0, number_of_hours: 0}
    );

    const totalsRow = {
        contract_number: "Total",
        ...totals,
    };

    const trainingsWithTotalsRows = [...trainings, totalsRow];

    return (
        <SimpleTable dataRows={trainingsWithTotalsRows} tableColumns={tableColumns} />
    );
};

export default SocialComponentTrainingsSummaryTable;
