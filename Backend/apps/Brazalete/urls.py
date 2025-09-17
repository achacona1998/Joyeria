from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'brazalete', BrazaleteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
