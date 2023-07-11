import {useState} from "react";

import {AddNewFullWidthButton} from "base/shared/components";
import {FieldReportProjectActivityForm} from "fieldReportProjectActivity/presentational/form";
import {FieldReportProjectActivityCard} from "fieldReportProjectActivity/presentational/section";

import Grid from "@mui/material/Grid";

const FieldReportProjectActivitiesSection = ({
    activities,
    isFormOpen,
    onOpenForm,
    onCloseForm,
    onSubmit,
}) => {
    const section = "activities";
    const [ifFormNewOpen, setIsFormNewOpen] = useState(isFormOpen === section);
    const [isFormEditOpen, setIsFormEditOpen] = useState(isFormOpen === section);
    const [activityToEditId, setActivityToEditId] = useState(false);

    const handleClickNew = () => {
        onOpenForm(section);
        setIsFormEditOpen(false);
        setIsFormNewOpen(true);
    };

    const handleClickEdit = activity => {
        onOpenForm(section);
        setActivityToEditId(activity.id);
        setIsFormNewOpen(false);
        setIsFormEditOpen(true);
    };

    const handleCancelForm = () => {
        setIsFormNewOpen(false);
        setIsFormEditOpen(false);
        onCloseForm(section);
    };

    const handleClickDelete = activity => {
        //TO-DO: Implement
        console.log(activity);
    };

    const handleSubmit = () => {
        onSubmit(section);
    };

    return (
        <>
            {activities?.map((activity, index) =>
                isFormOpen && activityToEditId === activity.id ? (
                    <Grid item mb={4} key={index}>
                        <FieldReportProjectActivityForm
                            activity={activity}
                            onSubmit={handleSubmit}
                            onCancel={handleCancelForm}
                            display={isFormOpen && isFormEditOpen}
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
            <FieldReportProjectActivityForm
                onSubmit={handleSubmit}
                onCancel={handleCancelForm}
                display={isFormOpen && ifFormNewOpen}
            />
            <Grid mt={2} display={isFormOpen ? "none" : "inherit"}>
                <AddNewFullWidthButton onClick={handleClickNew} />
            </Grid>
        </>
    );
};

export default FieldReportProjectActivitiesSection;
