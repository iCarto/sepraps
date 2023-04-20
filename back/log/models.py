from django.db import models


class LogRequest(models.Model):
    endpoint = models.TextField()  # The url the user requested
    username = models.CharField(
        max_length=150, null=True
    )  # User that made request, if authenticated
    response_code = models.PositiveSmallIntegerField()  # Response status code
    method = models.CharField(max_length=10, null=True)  # Request method
    remote_address = models.CharField(max_length=20, null=True)  # IP address of user
    exec_time = models.IntegerField(null=True)  # Time taken to create the response
    date = models.DateTimeField(auto_now=True)  # Date and time of request

    class Meta(object):
        db_table = "log_request"
        verbose_name = "Log Request"
        verbose_name_plural = "Log Requests"
