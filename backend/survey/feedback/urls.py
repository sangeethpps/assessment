from django.urls import path,include
from .views import *
urlpatterns = [
    path('questions/', QuestionsApi.as_view())
]