import {useEffect, useState} from "react";

import {ProjectService} from "project/service";
import {ContractService} from "contract/service";
import {contract_view_adapter, createContract} from "contract/model";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ContractProjectsFilterForm} from "contract/presentational/form";
import {ProjectCheckBoxList} from ".";
import {DialogLayout, Spinner} from "base/shared/components";
import {AlertError} from "base/error/components";

import Typography from "@mui/material/Typography";

const ProjectSelectorDialog = ({isDialogOpen, onCloseDialog, contract, projects}) => {
    const navigate = useNavigateWithReload();

    const [allProjects, setAllProjects] = useState([]);
    const [checked, setChecked] = useState([]);
    const [filter, setFilter] = useState({status: "active"});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ProjectService.getList(filter)
            .then(items => {
                const sortedProjects = items.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

                setAllProjects(sortedProjects);

                const selectedProjects = items.filter(item =>
                    projects.some(project => item.id === project.id)
                );

                setChecked([
                    ...checked,
                    ...selectedProjects.map(project => project.id),
                ]);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    }, [projects, filter]);

    const handleFilterChange = newFilter => {
        setFilter({...filter, ...newFilter});
    };

    const handleCloseDialog = isOpen => {
        onCloseDialog();
    };

    const handleClickCheckBox = selectedItems => {
        setChecked(selectedItems);
    };

    const handleConfirmAddition = () => {
        const updatedContract = createContract({
            ...contract,
            projects: [...checked],
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

    const selectedItemsInfo = `${checked.length} ${
        checked.length === 1 ? "seleccionado" : "seleccionados"
    }`;

    return (
        <DialogLayout
            dialogTitle={`Añadir proyectos al contrato`}
            dialogHeading={
                <>
                    <AlertError error={error} />
                    {!loading ? (
                        <>
                            <Typography
                                variant="subtitle2"
                                component="span"
                                textAlign="end"
                                color="text.secondary"
                                textTransform="uppercase"
                                mb={1}
                            >
                                {selectedItemsInfo}
                            </Typography>
                            <ContractProjectsFilterForm
                                onFilterChange={handleFilterChange}
                            />
                        </>
                    ) : null}
                </>
            }
            dialogContent={
                loading ? (
                    <Spinner />
                ) : (
                    <ProjectCheckBoxList
                        checked={checked}
                        projects={allProjects}
                        onCheck={handleClickCheckBox}
                    />
                )
            }
            mainActionText="Guardar"
            mainActionClick={handleConfirmAddition}
            handleDialog={handleCloseDialog}
            isDialogOpen={isDialogOpen}
            fullHeight
            fullWidth
            maxWidth="sm"
        />
    );
};

export default ProjectSelectorDialog;
