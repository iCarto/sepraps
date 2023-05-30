import {PageLayout} from "base/ui/main";
import {PaperContainer} from "base/shared/components";
import DownloadPDFButton from "base/report/components/DownloadPDFButton";
import {useEffect, useState} from "react";
import {useGetDataUrl} from "base/shared/utilities";

const ViewProjectsSupervisionPage = () => {
    const [imageUrl, setImageUrl] = useState(null);

    // const entityData = useOutletContext()[1];
    // const {download: handleDownloadEntityReportPdf} = useDownloadEntityPDFReport();
    const getDataUrl = useGetDataUrl();

    useEffect(() => {
        // if (entityData?.image) {
        //     // A Blob is necessary because we need to load the image using AuthService
        //     DocumentService.preview(entityData.image).then(response => {
        //         getDataUrl(response).then(dataUrl => {
        //             setImageUrl(dataUrl);
        //         });
        //     });
        // } else {
        //     setImageUrl(null);
        // }
        setImageUrl(null);
    }, []);

    const handleGeneratePDF = () => {
        // handleDownloadEntityReportPdf(entityData, imageUrl);
    };

    return (
        <PageLayout subPage={true}>
            <PaperContainer justifyContent="space-between" alignItems="center">
                <DownloadPDFButton handleGeneratePDF={handleGeneratePDF} />
            </PaperContainer>
        </PageLayout>
    );
};
export default ViewProjectsSupervisionPage;
