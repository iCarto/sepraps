import time

from log.models import LogRequest


class SaveRequest(object):
    def __init__(self, get_response):
        self.get_response = get_response

        # Filter to log all request to url's that start with any of the strings below.
        # With example below:
        # /example/test/ will be logged.
        # /other/ will not be logged.
        self.exclude = [
            "/api/monitoring/localities",
            "/api/monitoring/financingprograms",
            "/api/monitoring/financingfunds",
            "/api/monitoring/domainentries",
            "/gestion",
        ]

    def __call__(self, request):
        request_start_time = time.time()  # Calculated execution time.
        response = self.get_response(request)  # Get response from view function.
        request_execution_duration = int((time.time() - request_start_time) * 1000)

        # If the url does not start with on of the prefixes above, then return response and dont save log.
        # (Remove these two lines below to log everything)
        if list(filter(request.get_full_path().startswith, self.exclude)):
            return response

        # Create instance of our model and assign values
        request_log = LogRequest(
            endpoint=request.get_full_path(),
            response_code=response.status_code,
            method=request.method,
            remote_address=self.get_client_ip(request),
            exec_time=request_execution_duration,
        )

        # Assign user to log if it's not an anonymous user
        if not request.user.is_anonymous:
            request_log.username = request.user.username

        request_log.save()
        return response

    def get_client_ip(self, request):
        x_forwarded_for = request.headers.get("x-forwarded-for")
        if x_forwarded_for:
            return x_forwarded_for.split(",")[0]

        return request.META.get("REMOTE_ADDR")
