from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import MessageSerializer
from .models import AnonMessage
from .utils import createUrl
from cryptography.fernet import Fernet


class MessagePostView(APIView):
    def post(self, request):
        url = createUrl() 
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        message_instance, key = serializer.save() 
        message_instance.url = url  
        message_instance.save()  
        return Response({"message": f' url - {url}, key - {key}'})
    

class MessageGetView(APIView):
    def post(self, request, url):
        queryset = AnonMessage.objects.get(url=url)
        key = request.data.get('key')
        f = Fernet(key)
        message = f.decrypt(queryset.message.encode('utf-8'))
        return Response({'message': f'{message.decode('utf-8')}'})

        