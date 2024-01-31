import {useEffect, useState} from "react";

import {ProjectService} from "project/service";
import {ContractService} from "contract/service";
import {contract_view_adapter, createContract} from "contract/model";
import {useNavigateWithReload} from "base/navigation/hooks";
import {theme} from "Theme";

import {ProjectListItemButton} from "project/presentational";
import {SelectAllTransferList} from "base/list/components";
import {ContractProjectsFilterForm} from "contract/presentational/form";
import {DialogLayout} from "base/shared/components";
import {AlertError} from "base/error/components";

import Typography from "@mui/material/Typography";

const ProjectSelectorDialog = ({
    isDialogOpen,
    onCloseDialog,
    contract,
    contractProjects,
}) => {
    const navigate = useNavigateWithReload();

    const firstTimeMessage = (
        <Typography variant="body2" component="span">
            Realice una búsqueda para mostrar los proyectos que desee añadir.
        </Typography>
    );
    const noItemsFoundMessage = (
        <Typography variant="body2" component="span">
            No se ha encontrado ningún proyecto. <br />
            Realice otra búsqueda o{" "}
            <strong>
                compruebe que el proyecto que busca no se encuentra ya en la lista de la
                derecha
            </strong>
            .
        </Typography>
    );

    const [selectedProjects, setSelectedProjects] = useState([]);
    const [availableProjects, setAvailableProjects] = useState([]);
    const [filter, setFilter] = useState({});
    const [noItemsMessage, setNoItemsMessage] = useState(firstTimeMessage);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const getIsFilterEmpty = () => {
        return Object.keys(filter).every(key => key === "status" || !filter[key]);
    };

    useEffect(() => {
        const isFilterEmpty = getIsFilterEmpty();

        if (isFilterEmpty) {
            setAvailableProjects([]);
            setNoItemsMessage(firstTimeMessage);
        } else {
            setIsLoading(true);
            ProjectService.getList(filter)
                .then(items => {
                    const onlyNotSelectedProjects = items.filter(
                        item =>
                            !selectedProjects.some(project => item.id === project.id)
                    );
                    const sortedNotSelectedProjects = onlyNotSelectedProjects.sort(
                        (a, b) => a.name.localeCompare(b.name)
                    );

                    setNoItemsMessage(noItemsFoundMessage);
                    setAvailableProjects(sortedNotSelectedProjects);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setError(error);
                });
        }
    }, [filter]);

    useEffect(() => {
        setSelectedProjects(contractProjects);
    }, [contractProjects]);

    const handleCloseDialog = isOpen => {
        onCloseDialog();
    };

    const handleFilterChange = newFilter => {
        const statusFilter = {status: "active"};

        setFilter(prevFilter => ({...prevFilter, ...statusFilter, ...newFilter}));
    };

    const handleSelectedProjects = selectedItems => {
        setSelectedProjects(selectedItems);
    };

    const handleAvailableProjects = selectedItems => {
        setAvailableProjects(selectedItems);
    };

    const handleConfirmAddition = () => {
        const selectedProjectIds = selectedProjects.map(item => item.id);
        const updatedContract = createContract({
            ...contract,
            projects: [...selectedProjectIds],
        });
        handleFormSubmit(updatedContract);
    };

    const handleFormSubmit = contract => {
        ContractService.update(contract_view_adapter({...contract}))
            .then(() => {
                navigate(`/contracts/list/${contract.id}/projects`, true);
                onCloseDialog(false);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <DialogLayout
            dialogTitle={`Añadir proyectos al contrato`}
            dialogHeading={
                <>
                    <AlertError error={error} />
                    <ContractProjectsFilterForm onFilterChange={handleFilterChange} />
                </>
            }
            dialogContent={
                <SelectAllTransferList
                    availableItems={availableProjects}
                    preSelectedItems={selectedProjects}
                    noItemsMessage={noItemsMessage}
                    isListLoading={isLoading}
                    onChangeLeftItems={handleAvailableProjects}
                    onChangeRightItems={handleSelectedProjects}
                    listItemComponent={ProjectListItemButton}
                />
            }
            mainActionText="Guardar"
            mainActionClick={handleConfirmAddition}
            handleDialog={handleCloseDialog}
            isDialogOpen={isDialogOpen}
            style={{backgroundColor: theme.palette.pageBackground.secondary}}
            fullHeight
            fullWidth
            maxWidth="md"
        />
    );
};

export default ProjectSelectorDialog;
