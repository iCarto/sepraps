import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {useOutletContext} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {RouterUtil} from "base/navigation/utilities";
import {DateUtil} from "base/format/utilities";
import {CertificationService} from "certification/service";

import {PaymentStatusChip, getStatusIcon} from "payment/presentational";
import {ViewOrUpdateCertificationDataContent} from ".";

import {ContentLayoutWithAside, SubpageWithSelectorContainer} from "base/ui/main";
import {ListSelector, ListSelectorItem, Spinner} from "base/shared/components";
import {EntityContent} from "base/entity/components/presentational";
import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {SectionCardHeaderAction} from "base/ui/section/components";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {ViewOrUpdateCommentsContent} from "component/container";
import {DeleteItemDialog} from "base/delete/components";
import {AlertError} from "base/error/components";

import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewCertificationContent = () => {
    const {project, certifications} = useOutletContext();
    const {certificationId} = useParams();

    const location = useLocation();
    const navigate = useNavigateWithReload();
    const basePath = RouterUtil.getPathForSegment(location, "certifications/list");

    const [certification, setCertification] = useState(null);

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setCertification(null);
        if (certificationId) {
            setIsLoading(true);
            CertificationService.get(certificationId)
                .then(data => {
                    setCertification(data);
                    setError(null);
                    setIsLoading(false);
                })
                .catch(error => {
                    handleError(error);
                    setIsLoading(false);
                });
        } else if (certifications?.length > 0) {
            navigate(certifications[0].id.toString());
        }
        setIsLoading(false);
    }, [certificationId, location.state?.lastRefreshDate]);

    const handleDelete = () => {
        CertificationService.delete(certification.id)
            .then(() => {
                navigate(basePath, true);
            })
            .catch(error => {
                handleError(error);
            });
    };

    const handleError = error => {
        console.log(error);
        setError(error);
    };

    const actions = [
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

    return (
        <SubpageWithSelectorContainer
            itemsName="certificaciones"
            itemSelector={
                <ListSelector
                    title="Certificaciones"
                    items={certifications}
                    renderItem={certification => (
                        <ListSelectorItem
                            key={certification.id}
                            heading={DateUtil.formatDate(
                                certification.payment?.approval_date ||
                                    certification.payment?.expected_approval_date
                            )}
                            subHeading={certification.payment?.name || "-"}
                            icon={getStatusIcon(certification.payment?.status)}
                            to={`${basePath}/${certification.id}`}
                            selected={parseInt(certificationId) === certification.id}
                        />
                    )}
                    basePath={basePath}
                />
            }
            noItems={certifications?.length === 0}
        >
            <ContentLayoutWithAside>
                <AlertError error={error} />
                {isLoading ? <Spinner /> : null}
                {certification && (
                    <EntityContent
                        entityLabel="Certificación"
                        entityName={DateUtil.formatDate(
                            certification.payment?.approval_date ||
                                certification.payment?.expected_approval_date
                        )}
                        entityIcon={<RequestQuoteOutlinedIcon />}
                        chip={
                            <PaymentStatusChip
                                label={certification.payment?.status_label}
                                value={certification.payment?.status}
                            />
                        }
                        actions={actions}
                    >
                        <ViewOrUpdateCertificationDataContent
                            project={project}
                            certification={certification}
                        />
                        <ViewOrUpdateFilesDataContent
                            folderPath={certification.folder}
                        />
                        <ViewOrUpdateCommentsContent
                            entity={certification}
                            service={CertificationService}
                        />
                        <EntityAuditSection entity={certification} />
                        <DeleteItemDialog
                            isDialogOpen={isDeleteDialogOpen}
                            setIsDialogOpen={setIsDeleteDialogOpen}
                            onDelete={handleDelete}
                        />
                    </EntityContent>
                )}
            </ContentLayoutWithAside>
        </SubpageWithSelectorContainer>
    );
};

export default ViewCertificationContent;
