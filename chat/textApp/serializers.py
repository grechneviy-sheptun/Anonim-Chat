from rest_framework import serializers
from .models import AnonMessage
from cryptography.fernet import Fernet



class MessageSerializer(serializers.ModelSerializer):
    class Meta:
          model = AnonMessage
          fields = ['message', 'password']

    password = serializers.CharField(max_length=30)

    def validate(self, attrs):
       password = attrs.get('password')
       if len(password) < 6:
           raise ValueError("Password must be greater 6")
       return attrs

    def create(self, validated_data):
        key = Fernet.generate_key()
        f = Fernet(key)
        message = validated_data.get('message')
        token = f.encrypt(message.encode('utf-8'))
        validated_data['message'] = token.decode('utf-8')
        mess = AnonMessage.objects.create_message(message=validated_data['message'])
        return mess, key.decode('utf-8')


