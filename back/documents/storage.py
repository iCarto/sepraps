import os

from django.conf import settings
from django.core.files.storage import default_storage
from PIL import ExifTags, Image


def rotate_image(orientation, image):
    if orientation == 3:
        return image.rotate(180, expand=True)
    elif orientation == 6:
        return image.rotate(270, expand=True)
    elif orientation == 8:
        return image.rotate(90, expand=True)


def fix_jpeg_orientation(filepath):
    filepath = os.path.join(settings.MEDIA_ROOT, filepath)
    image = Image.open(filepath)

    for orientation in ExifTags.TAGS.keys():
        if ExifTags.TAGS[orientation] == "Orientation":
            break

    exif = image._getexif()  # noqa: WPS437
    exif_orientation = (
        exif[orientation] if exif and orientation in exif else None  # noqa: WPS441
    )
    if exif_orientation:
        image = rotate_image(exif_orientation, image)

        image.save(filepath)
        image.close()


def open(file, mode="rb"):  # noqa: WPS125
    return default_storage.open(file, mode)


def save(path, file):
    saved_file = default_storage.save(path, file)

    if file.content_type == "image/jpeg":
        try:
            fix_jpeg_orientation(path)
        except (AttributeError, KeyError, IndexError):
            # cases: image don't have getexif
            pass  # noqa: WPS420

    return saved_file


def delete(path):
    return default_storage.delete(path)
