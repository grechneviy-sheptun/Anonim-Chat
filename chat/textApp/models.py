from django.db import models
from .manager import MessageManager
class AnonMessage(models.Model):
    message = models.TextField()
    url = models.CharField(max_length=255)

    objects = MessageManager()
    