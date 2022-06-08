from datetime import datetime
from io import BytesIO

from rest_framework import renderers


class CSVFileRenderer(renderers.BaseRenderer):
    media_type = "text/csv"
    format = "csv"
    charset = None
    render_style = "binary"

    def render(self, data, media_type=None, renderer_context=None):
        if renderer_context is not None:
            path = renderer_context["request"].get_full_path()
            filename = "{}_{}".format(
                datetime.now().strftime("%Y%m%d%H%M%S"), "_".join(path.split("/")[-2:])
            )
            renderer_context["response"][
                "Content-Disposition"
            ] = "attachment; filename={}.csv".format(filename)

        buffer = BytesIO()
        data.to_csv(buffer, index=False)
        return buffer.getvalue()
