import React from "react";
import {DateUtil} from "base/format/utilities";
import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import Stack from "@mui/material/Stack/Stack";

const TypographyStyled = props => (
    <Typography variant="caption" {...props} sx={{...props.sx, color: "grey"}}>
        {props.children}
    </Typography>
);

const TypographyStyledForTooltip = React.forwardRef((props, ref) => (
    <Typography
        variant="caption"
        {...props}
        sx={{color: "grey", fontWeight: "bold"}}
        ref={ref}
    >
        {props.children}
    </Typography>
));

const CommentData = ({comment}) => {
    return (
        comment && (
            <Box sx={{p: 1, border: 1, borderRadius: 2, borderColor: "grey.200"}}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <ChatOutlinedIcon sx={{fontSize: "15px", color: "grey.500"}} />
                    <Box>
                        <TypographyStyled>El</TypographyStyled>
                        <Tooltip
                            title={`${DateUtil.formatDateTime(comment.created_at)}`}
                        >
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
                <Typography sx={{fontStyle: "italic", p: 1}}>{comment.text}</Typography>
            </Box>
        )
    );
};

export default CommentData;
