import Box from "@mui/material/Box";
import {DateUtil} from "base/format/utilities";
import {styled} from "@mui/material/styles";
import {TextLink} from "base/navigation/components";

const StyledBox = styled(Box)(({theme}) => ({
    "& *:not(:last-child):after": {
        content: '" | "',
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
            label: "Número de memorándum",
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
            label: "Elaborado por",
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
                                <TextLink
                                    text={contract.label}
                                    to={`/contracts/list/${contract.id}/summary`}
                                />
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
                                <TextLink
                                    text={project.label}
                                    to={`/projects/list/${project.id}/summary`}
                                />
                            </Box>
                        ))}
                    </StyledBox>
                );
            },
        },
    ];

    return {tableColumns};
}
