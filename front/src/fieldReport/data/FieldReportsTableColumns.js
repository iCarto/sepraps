import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {DateUtil} from "base/format/utilities";
import {Link} from "react-router-dom";
import {styled} from "@mui/material/styles";

const StyledBox = styled(Box)(({theme}) => ({
    "& *:not(:last-child):after": {
        content: '" · "',
    },
    "& a": {
        whiteSpace: "nowrap",
    },
}));

export function useFieldReportsTableColumns() {
    const tableColumns = [
        {
            id: "name",
            label: "Nombre",
            width: 25,
        },
        {
            id: "code",
            label: "Memorándum",
            width: 10,
        },
        {
            id: "date",
            label: "Fecha",
            formatFunction: item => {
                return DateUtil.formatDate(item.date);
            },
            width: 10,
        },
        {
            id: "reporting_person",
            label: "Autor/a",
            width: 15,
        },
        {
            id: "contract_list",
            label: "Contratos",
            width: 20,
            formatFunction: item => {
                return (
                    <StyledBox>
                        {item.contract_list.map(contract => (
                            <Box component="span" key={contract.id}>
                                <Typography
                                    component={Link}
                                    to={`/contracts/${contract.id}/summary`}
                                >
                                    {contract.label}
                                </Typography>
                            </Box>
                        ))}
                    </StyledBox>
                );
            },
        },
        {
            id: "project_list",
            label: "Proyectos",
            width: 20,
            formatFunction: item => {
                return (
                    <StyledBox>
                        {item.project_list.map(project => (
                            <Box component="span" key={project.id}>
                                <Typography
                                    component={Link}
                                    to={`/projects/${project.id}/summary`}
                                >
                                    {project.label}
                                </Typography>
                            </Box>
                        ))}
                    </StyledBox>
                );
            },
        },
    ];

    return {tableColumns};
}
