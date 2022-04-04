from django.contrib.auth import get_user_model
from django.urls import path
from rest_framework.routers import DefaultRouter

from post import views

app_name = 'post'

router = DefaultRouter()
router.register("posts", views.PostViewSet)

urlpatterns = router.urls
