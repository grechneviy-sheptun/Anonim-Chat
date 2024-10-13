from django.contrib.auth.models import BaseUserManager
class MessageManager(BaseUserManager):
    def create_message(self, message):
        message = self.model(message=message)
        message.save(using=self.db)
        return message