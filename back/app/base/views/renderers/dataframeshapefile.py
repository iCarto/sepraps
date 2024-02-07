from datetime import datetime
from io import BytesIO

from rest_framework import renderers

from app.base.views.renderers.utilities import (
    format_float_columns,
    get_geodf_from_response,
)


class DataFrameShapefileFileRenderer(renderers.BaseRenderer):
    media_type = "aplication/x-shapefile"
    format = "shp"
    charset = None
    render_style = "binary"

    def render(self, response, media_type=None, renderer_context=None):
        df = get_geodf_from_response(response)
        df = format_float_columns(df)

        now = datetime.now().strftime("%Y%m%d%H%M%S")
        request_path = renderer_context["request"].path.split("/")[-1:]
        filename = "{0}_{1}.shp.zip".format(now, "_".join(request_path))

        renderer_context["response"][
            "Content-Disposition"
        ] = f"attachment; filename={filename}"

        # temp dir to store shp aux files and then create zip inside with to_file
        with tempfile.TemporaryDirectory() as temp_dir:
            temp_dir = Path(temp_dir)
            file_path = temp_dir / filename

            df.to_file(filename=file_path, driver="ESRI Shapefile")

            buffer = BytesIO()
            with open(file_path, "rb") as fh:
                buffer.write(fh.read())

            shutil.rmtree(temp_dir)

            return buffer.getvalue()
