import {useEffect, useState} from "react";

import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import {DateUtil} from "utilities";

const QuestionnaireInstanceTree = ({
    projectQuestionnaire,
    instanceSelectedId = null,
    onInstanceSelected = null,
}) => {
    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState([]);
    const [instancesByYear, setInstancesByYear] = useState([]);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, selectedCode) => {
        const isYearSelected = instancesByYear.find(item => item.code === selectedCode);
        if (!isYearSelected) {
            setSelected(selectedCode);
            if (onInstanceSelected) {
                onInstanceSelected(parseInt(selectedCode));
            }
        }
    };

    const getYearNodeCode = year => {
        return `${projectQuestionnaire.projectId}-${projectQuestionnaire.questionnaire.code}-${year}`;
    };

    useEffect(() => {
        const instancesByYear = projectQuestionnaire.questionnaire_instances
            .map(instance => {
                return {
                    code: getYearNodeCode(instance.year),
                    label: instance.year,
                    children: [],
                };
            })
            .filter((v, i, a) => a.findIndex(v2 => v2.code === v.code) === i);

        instancesByYear.forEach(item => {
            item.children = projectQuestionnaire.questionnaire_instances
                .filter(instance => getYearNodeCode(instance.year) === item.code)
                .map(instance => {
                    return {
                        code: instance.id.toString(),
                        label: DateUtil.getMonthName(instance.month),
                    };
                });
        });

        setInstancesByYear(instancesByYear);
        setExpanded(instancesByYear.map(item => item.code));
    }, [projectQuestionnaire]);

    useEffect(() => {
        if (instanceSelectedId) {
            setSelected(instanceSelectedId);
        }
    }, [instanceSelectedId]);

    return (
        <Box
            sx={{
                flexGrow: 1,
                maxWidth: 400,
                overflowY: "auto",
                borderRadius: "5px",
                border: "1px solid",
                borderColor: "grey.200",
                bgcolor: "grey.100",
                p: 2,
            }}
        >
            <TreeView
                aria-label="controlled"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                {instancesByYear.map(item => (
                    <TreeItem
                        key={item.code}
                        nodeId={item.code.toString()}
                        label={item.label}
                    >
                        {item.children.map(childItem => (
                            <TreeItem
                                key={childItem.code}
                                nodeId={childItem.code.toString()}
                                label={childItem.label}
                            />
                        ))}
                    </TreeItem>
                ))}
            </TreeView>
        </Box>
    );
};

export default QuestionnaireInstanceTree;
