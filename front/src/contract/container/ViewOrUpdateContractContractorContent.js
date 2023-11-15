import {useState} from "react";
import {useAuth} from "base/user/provider";
import {useNavigateWithReload} from "base/navigation/hooks";

import {ContractService} from "contract/service";
import {ContractorService} from "contractor/service";
import {contractor_view_adapter} from "contractor/model";
import {contract_view_adapter} from "contract/model";

import {
    ContractorForm,
    ContractorFormFields,
    ContractorFormSearch,
} from "contractor/presentational/form";

import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {RemoveItemDialog} from "base/delete/components";

import EditIcon from "@mui/icons-material/Edit";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import {ContractContractorSection} from "contract/presentational/section";
import {NoDataContainer} from "base/shared/components";
import {EntityAddButtonGroup} from "base/entity/components/presentational";

const ViewOrUpdateContractContractorContent = ({contract}) => {
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

    const handleCreateFormSubmit = contractor => {
        ContractService.createContractor(
            contract.id,
            contractor_view_adapter({...contractor})
        )
            .then(createdContractor => {
                setMode("view");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleEditFormSubmit = contractor => {
        ContractorService.update(contractor_view_adapter({...contractor}))
            .then(updatedContractor => {
                setMode("view");
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleChangeContractor = contractor => {
        ContractService.update(
            contract_view_adapter({...contract, contractor: contractor})
        ).then(() => {
            navigate("", true);
        });
    };

    const handleRemoveContractor = () => {
        setIsRemoveDialogOpen(false);
        ContractService.update(
            contract_view_adapter({...contract, contractor: null})
        ).then(() => {
            navigate("", true);
        });
    };

    const getComponent = mode => {
        if (mode === "view") {
            return contract.contractor ? (
                <>
                    <ContractContractorSection contractor={contract.contractor} />
                    <RemoveItemDialog
                        isDialogOpen={isRemoveDialogOpen}
                        setIsDialogOpen={setIsRemoveDialogOpen}
                        onRemove={handleRemoveContractor}
                    />
                </>
            ) : (
                <NoDataContainer
                    text="El contrato no tiene ningún contratista asignado"
                    button={
                        <EntityAddButtonGroup
                            onAdd={() => setMode("new")}
                            onSearch={() => setMode("search")}
                        />
                    }
                />
            );
        }
        if (mode === "new") {
            return (
                <ContractorForm
                    onSubmit={handleCreateFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                >
                    <ContractorFormFields />
                </ContractorForm>
            );
        }
        if (mode === "edit") {
            return (
                <ContractorForm
                    contractor={contract.contractor}
                    onSubmit={handleEditFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                >
                    <ContractorFormFields />
                </ContractorForm>
            );
        }
        if (mode === "search") {
            return (
                <ContractorFormSearch
                    onSubmit={handleChangeContractor}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                />
            );
        }
    };

    const headerActions = contract.contractor?.id
        ? [
              <SectionCardHeaderAction
                  key="edit"
                  name="edit"
                  text="Modificar"
                  icon={<EditIcon />}
                  onClick={() => {
                      setMode("edit");
                  }}
                  roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
              />,
              <SectionCardHeaderAction
                  key="remove"
                  name="remove"
                  text="Quitar"
                  icon={<LinkOffIcon />}
                  onClick={() => {
                      setIsRemoveDialogOpen(true);
                  }}
                  roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
              />,
          ]
        : null;

    return (
        <SectionCard title="Contratista" secondaryActions={headerActions}>
            {getComponent(mode)}
        </SectionCard>
    );
};

export default ViewOrUpdateContractContractorContent;
