import {useState} from "react";

import {connection_view_adapter} from "connection/model";
import {ConnectionService} from "connection/service";

import {useNavigateWithReload} from "base/navigation/hooks";
import {SectionCard, SectionCardHeaderAction} from "base/ui/section/components";
import {ConnectionForm} from "connection/presentational/form";
import {ConnectionData} from "connection/presentational";

import CardContent from "@mui/material/CardContent";
import EditIcon from "@mui/icons-material/Edit";

const ViewOrUpdateConnectionsDataContent = ({connection, projectId}) => {
    const navigate = useNavigateWithReload();

    const [mode, setMode] = useState("view");
    const [error, setError] = useState(null);

    const handleFormSubmit = data => {
        ConnectionService.update(connection_view_adapter({...data}))
            .then(updatedConnection => {
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
    ];

    const getComponent = mode => {
        if (mode === "view") {
            return <ConnectionData connection={connection} />;
        }
        if (mode === "edit") {
            return (
                <ConnectionForm
                    projectId={projectId}
                    connection={connection}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setMode("view");
                    }}
                    error={error}
                />
            );
        }
    };

    return (
        connection && (
            <SectionCard title="Conexiones" secondaryActions={actions}>
                <CardContent sx={{p: 0}}>{getComponent(mode)}</CardContent>
            </SectionCard>
        )
    );
};

export default ViewOrUpdateConnectionsDataContent;
