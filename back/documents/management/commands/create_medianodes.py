from django.core.management.base import BaseCommand

from documents.base.base_models import BaseDocumentModel


class Command(BaseCommand):
    help = "Gets all the models that implement BaseDocumentModel and creates the related MediaNode instances"

    def handle(self, *args, **options):
        # from django.apps import apps
        # Entity = apps.get_model("app", model_name)
        subclasses = BaseDocumentModel.__subclasses__()
        self.stdout.write("Creating MediaNode instances for:")
        for Entity in subclasses:  # noqa: N806
            self.stdout.write(str(Entity))
            for e in Entity.objects.all():
                if not e.folder_id:
                    e.post_create(None, True)  # noqa: FBT003

        self.stdout.write(self.style.SUCCESS("All done"))
