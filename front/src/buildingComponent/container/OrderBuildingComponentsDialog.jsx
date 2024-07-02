import {useEffect, useState} from "react";

import {theme} from "Theme";
import {ProjectService} from "project/service";
import {useNavigateWithReload} from "base/navigation/hooks";

import {DialogLayout} from "base/dialog/components";
import {AlertError} from "base/error/components";
import {ImagePreview} from "base/image/components";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const arraymove = (arr, fromIndex, toIndex) => {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
};

const OrderBuildingComponentsDialog = ({
    isDialogOpen,
    onCloseDialog,
    projectId,
    bcMonitorings,
}) => {
    const navigate = useNavigateWithReload();
    const [error, setError] = useState("");
    const [orderedBCMonitorings, setOrderedBCMonitorings] = useState([]);

    const basePath = `/projects/list/${projectId}/buildingcomponents/list`;

    useEffect(() => {
        setOrderedBCMonitorings(bcMonitorings);
    }, [bcMonitorings]);

    const handleFormSubmit = () => {
        const orderComponents = orderedBCMonitorings.map((orderBCMonitoring, index) => {
            return {
                id: orderBCMonitoring.id,
                project_order: index + 1,
            };
        });
        ProjectService.orderProjectBuildingComponentMonitoring(
            projectId,
            orderComponents
        )
            .then(response => {
                onCloseDialog();
                navigate(`${basePath}`, true);
            })
            .catch(error => {
                setError(error);
            });
    };

    const move = (bcMonitoringId, positions) => {
        const bcMonitoringIndex = orderedBCMonitorings.findIndex(
            bcMonitoring => bcMonitoring.id === bcMonitoringId
        );
        if (
            bcMonitoringIndex + positions >= 0 &&
            bcMonitoringIndex + positions < orderedBCMonitorings.length
        ) {
            const newOrderedBCMonitorings = arraymove(
                [...orderedBCMonitorings],
                bcMonitoringIndex,
                bcMonitoringIndex + positions
            );
            setOrderedBCMonitorings(newOrderedBCMonitorings);
        }
    };

    const moveUp = bcMonitoringId => {
        move(bcMonitoringId, -1);
    };

    const moveDown = bcMonitoringId => {
        move(bcMonitoringId, 1);
    };

    return (
        <DialogLayout
            dialogTitle={`Ordenar los componentes del proyecto`}
            dialogContent={
                <Paper elevation={3} sx={{p: 2}}>
                    {orderedBCMonitorings &&
                        orderedBCMonitorings.map((bcMonitoring, index) => (
                            <Box key={bcMonitoring.id}>
                                <AlertError error={error} />
                                {index != 0 && <Divider />}
                                <Stack direction="row" alignItems="center" sx={{p: 1}}>
                                    <Stack direction="row" sx={{mr: 1}}>
                                        <Box sx={{minWidth: "35px"}}>
                                            {index != 0 && (
                                                <Tooltip
                                                    title="Mover arriba"
                                                    placement="bottom-end"
                                                >
                                                    <IconButton
                                                        aria-label="move-up"
                                                        onClick={() =>
                                                            moveUp(bcMonitoring.id)
                                                        }
                                                        sx={{border: 1}}
                                                    >
                                                        <ArrowUpwardIcon
                                                            sx={{fontSize: 12}}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </Box>
                                        <Box sx={{minWidth: "35px"}}>
                                            {index !=
                                                orderedBCMonitorings.length - 1 && (
                                                <Tooltip
                                                    title="Mover abajo"
                                                    placement="bottom-end"
                                                >
                                                    <IconButton
                                                        aria-label="move-down"
                                                        onClick={() =>
                                                            moveDown(bcMonitoring.id)
                                                        }
                                                        sx={{border: 1}}
                                                    >
                                                        <ArrowDownwardIcon
                                                            sx={{fontSize: 12}}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </Box>
                                    </Stack>
                                    <Typography sx={{mr: 2}}>{`${
                                        index + 1
                                    }.`}</Typography>
                                    <Avatar>
                                        <ImagePreview
                                            path={bcMonitoring.featured_image}
                                            alt={bcMonitoring.building_component.name}
                                            width="50px"
                                            height="50px"
                                        />
                                    </Avatar>
                                    <Typography sx={{ml: 2}}>
                                        {bcMonitoring?.building_component?.name}
                                    </Typography>
                                </Stack>
                            </Box>
                        ))}
                </Paper>
            }
            mainActionText="Guardar"
            onMainActionClick={handleFormSubmit}
            onHandleDialog={onCloseDialog}
            isDialogOpen={isDialogOpen}
            style={{backgroundColor: theme.palette.pageBackground.secondary}}
            fullWidth
            maxWidth="md"
        />
    );
};

export default OrderBuildingComponentsDialog;
