import {SubPageMenuListGroup} from "base/ui/menu";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

const QuestionnairesMenu = ({questionnaires, basePath}) => {
    const menuItems = [];

    questionnaires?.map(questionnaire =>
        menuItems.push({
            to: `${basePath}/questionnaires/${questionnaire?.code}`,
            text: questionnaire?.name,
        })
    );

    return (
        <SubPageMenuListGroup
            headerText="Cuestionarios"
            headerIcon={<AssignmentOutlinedIcon />}
            items={menuItems}
        />
    );
};

export default QuestionnairesMenu;
