import {useNavigate} from "react-router-dom";

import {useAuth} from "base/user/provider";

import {AddNewButton} from "base/shared/components";
import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

const FieldReportCommentsEndSection = ({fieldReport}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    // TO-DO: Extract to actions hook
    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate(`end/add`);
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    return (
        <>
            <SectionCard
                title="Explicación del informe"
                secondaryActions={secondaryActions}
            >
                {fieldReport?.report_comments_end ? (
                    <Typography>{fieldReport?.report_comments_end}</Typography>
                ) : (
                    <>
                        <Stack alignItems="center" spacing={3}>
                            <Typography sx={{fontStyle: "italic"}}>
                                No se ha definido la explicación de este informe.
                            </Typography>
                            <AddNewButton
                                text="Añadir explicación"
                                basePath="end/add"
                            />
                        </Stack>
                    </>
                )}
            </SectionCard>
        </>
    );
};

export default FieldReportCommentsEndSection;
