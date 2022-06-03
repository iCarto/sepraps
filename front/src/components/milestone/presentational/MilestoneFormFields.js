import {FormChecklist, FormDatePicker} from "components/common/form";

const MilestoneFormFields = ({
    checklist = [],
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
                checklist={checklist}
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
