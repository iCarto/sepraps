import {useState} from "react";

import {AddNewButtonFullWidthButton} from "base/shared/components";
import {FieldReportProjectActivitiesForm} from "../form";

import Grid from "@mui/material/Grid";
import FieldReportProjectActivityCard from "./FieldReportProjectActivityCard";

const FieldReportProjectActivitiesSection = ({activities}) => {
    const [displayFormNew, setDisplayFormNew] = useState(false);
    const [displayFormEdit, setDisplayFormEdit] = useState(false);
    const [activityToEditId, setActivityToEditId] = useState(false);

    const handleClickNew = () => {
        setDisplayFormEdit(false);
        setDisplayFormNew(true);
    };

    const handleClickEdit = activity => {
        setActivityToEditId(activity.id);
        setDisplayFormNew(false);
        setDisplayFormEdit(true);
    };

    const handleCancelForm = () => {
        setDisplayFormNew(false);
        setDisplayFormEdit(false);
    };

    const handleClickDelete = activity => {
        //TO-DO: Implement
        console.log(activity);
    };

    return (
        <>
            {activities?.map((activity, index) =>
                displayFormEdit && activityToEditId === activity.id ? (
                    <Grid item mb={4} key={index}>
                        <FieldReportProjectActivitiesForm
                            activity={activity}
                            onSubmit={undefined}
                            onCancel={handleCancelForm}
                            display={displayFormEdit}
                        />
                    </Grid>
                ) : (
                    <FieldReportProjectActivityCard
                        key={index}
                        index={index}
                        activity={activity}
                        onEdit={handleClickEdit}
                        onDelete={handleClickDelete}
                    />
                )
            )}
            <FieldReportProjectActivitiesForm
                onSubmit={undefined}
                onCancel={handleCancelForm}
                display={displayFormNew}
            />
            <Grid
                mt={2}
                display={displayFormNew || displayFormEdit ? "none" : "inherit"}
            >
                <AddNewButtonFullWidthButton onClick={handleClickNew} />
            </Grid>
        </>
    );
};

export default FieldReportProjectActivitiesSection;
