from django.core.files.storage import default_storage


def open(file, mode="rb"):
    return default_storage.open(file, mode)


def save(path, file):
    return default_storage.save(path, file)


def delete(path):
    return default_storage.delete(path)
