from documents.models import create_folder_structure


def sanitize_field_value(value):
    return value.replace("/", "-").replace(" ", "_").replace("(", "").replace(")", "")


def create_folder(instance, field="id", created=True, children_data=None):
    """Create folder structure."""
    if not created:
        return
    if children_data is None:
        children_data = []

    classtype = type(instance).__name__
    field_value = sanitize_field_value(str(getattr(instance, field)))
    root_folder = create_folder_structure(
        "{0}_{1}".format(classtype, field_value),
        "{0}/{1}".format(classtype.lower(), field_value),
        children_data,
    )
    instance.folder = root_folder

    instance.save()
