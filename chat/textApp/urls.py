from django.urls import path
from .views import MessageGetView, MessagePostView
urlpatterns = [
    path('message-post/', MessagePostView.as_view()),
    path('message-get/<int:url>/', MessageGetView.as_view()),
]