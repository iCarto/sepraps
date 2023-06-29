import {useNavigate} from "react-router-dom";

import {useAuth} from "base/user/provider";

import {AddNewButton} from "base/shared/components";
import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

const FieldReportCommentsStartSection = ({fieldReport}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate(`start/add`);
            }}
            roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
        />,
    ];

    return (
        <>
            <SectionCard
                title="Introducción al informe"
                secondaryActions={secondaryActions}
            >
                {fieldReport?.report_comments_start ? (
                    <Typography>{fieldReport?.report_comments_start}</Typography>
                ) : (
                    <>
                        <Stack alignItems="center" spacing={3}>
                            <Typography sx={{fontStyle: "italic"}}>
                                No se ha definido la introducción para este informe.
                            </Typography>
                            <AddNewButton
                                text="Añadir introducción"
                                basePath="start/add"
                            />
                        </Stack>
                    </>
                )}
            </SectionCard>
        </>
    );
};

export default FieldReportCommentsStartSection;
