import {PageLayout} from "base/ui/main";
import {AlertError} from "base/error/components";
import {PaperContainer} from "base/shared/components";
import {SectionHeading} from "base/ui/section/components";

const EntityCreatePage = ({form, title, error = null}) => {
    return (
        <PageLayout subPage={true}>
            <PaperContainer maxWidth="md" mx="auto">
                <SectionHeading label={false}>{title}</SectionHeading>
                {error && <AlertError error={error} />}
                {form}
            </PaperContainer>
        </PageLayout>
    );
};

export default EntityCreatePage;
