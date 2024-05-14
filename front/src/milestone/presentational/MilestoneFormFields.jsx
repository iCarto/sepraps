import {FormChecklist, FormDatePicker, FormTextArea} from "base/form/components";

const MilestoneFormFields = ({
    checklistItems = [],
    handleChecklist = null,
    areAllItemsChecked = false,
}) => {
    const onCheck = allItemsChecked => {
        handleChecklist(allItemsChecked);
    };

    return (
        <>
            <FormChecklist
                name="milestone_checklist"
                onChangeHandler={onCheck}
                checklistItems={checklistItems}
            />
            <FormTextArea
                name="comments"
                label="Observaciones"
                isActive={areAllItemsChecked}
            />
            <FormDatePicker
                name="compliance_date"
                label="Fecha de cumplimiento"
                isActive={areAllItemsChecked}
                rules={{required: "El campo es obligatorio"}}
            />
        </>
    );
};

export default MilestoneFormFields;
