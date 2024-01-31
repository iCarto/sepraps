import {forwardRef, useState} from "react";

import {CommentService} from "comment/service";
import {payment_view_adapter} from "payment/model";
import {DateUtil} from "base/format/utilities";
import {useNavigateWithReload} from "base/navigation/hooks";
import {SectionActionsMenu, SectionCardHeaderAction} from "base/ui/section/components";
import {DeleteItemDialog} from "base/delete/components";
import {CommentForm} from "comment/presentational/form";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

const TypographyStyled = props => (
    <Typography variant="caption" {...props} sx={{...props.sx, color: "grey"}}>
        {props.children}
    </Typography>
);

const TypographyStyledForTooltip = forwardRef((props, ref) => (
    <Typography
        variant="caption"
        {...props}
        sx={{color: "grey", fontWeight: "bold"}}
        ref={ref}
    >
        {props.children}
    </Typography>
));

const ViewOrUpdateCommentDataContent = ({comment}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        CommentService.delete(comment.id).then(() => {
            navigate("", true);
        });
    };

    const handleFormSubmit = comment => {
        CommentService.update(payment_view_adapter({...comment}))
            .then(updatedComment => {
                setMode("view");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const actions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                setMode("edit");
            }}
        />,
        <SectionCardHeaderAction
            key="delete"
            name="delete"
            text="Eliminar"
            icon={<DeleteIcon color="error" />}
            onClick={() => {
                setIsDeleteDialogOpen(true);
            }}
        />,
    ];

    const getComponent = mode => {
        if (mode === "view") {
            return <Box sx={{fontStyle: "italic", p: 0}}>{comment.text}</Box>;
        }
        if (mode === "edit") {
            return (
                <CommentForm
                    comment={comment}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                />
            );
        }
    };

    const getTitle = comment => {
        return (
            <Stack direction="row" alignItems="center" spacing={1}>
                <ChatOutlinedIcon sx={{fontSize: "15px", color: "grey.500"}} />
                <Box>
                    <TypographyStyled>El</TypographyStyled>
                    <Tooltip title={`${DateUtil.formatDateTime(comment.created_at)}`}>
                        <TypographyStyledForTooltip>
                            {` ${DateUtil.formatDate(comment.created_at)} `}
                        </TypographyStyledForTooltip>
                    </Tooltip>
                    <TypographyStyled>el usuario</TypographyStyled>
                    <TypographyStyled
                        sx={{fontWeight: "bold"}}
                    >{` ${comment.created_by} `}</TypographyStyled>
                    <TypographyStyled>comentó:</TypographyStyled>
                </Box>
            </Stack>
        );
    };

    return (
        <Card elevation={0}>
            <CardHeader
                title={getTitle(comment)}
                sx={{p: 0, borderBottom: 1, borderColor: "grey.200"}}
                action={<SectionActionsMenu>{actions}</SectionActionsMenu>}
            />
            <CardContent sx={{"&.MuiCardContent-root": {pb: 1}}}>
                {getComponent(mode)}
            </CardContent>
            <DeleteItemDialog
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
                onDelete={handleDelete}
            />
        </Card>
    );
};

export default ViewOrUpdateCommentDataContent;
