from documents.models import create_folder_structure


def create_folder(instance, field="id", created=True, children_data=None):
    """Create folder structure."""
    if not created:
        return
    if children_data is None:
        children_data = []

    classtype = type(instance).__name__
    root_folder = create_folder_structure(
        "{0}_{1}".format(classtype, str(getattr(instance, field))),
        "{0}/{1}".format(classtype.lower(), str(getattr(instance, field))),
        children_data,
    )
    instance.folder = root_folder

    instance.save()
