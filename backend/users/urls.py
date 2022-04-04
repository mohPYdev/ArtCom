from django.contrib.auth import get_user_model
from django.urls import path
from rest_framework.routers import DefaultRouter

from users import views

app_name = 'users'

router = DefaultRouter()
router.register("users", views.UserViewSet)

User = get_user_model()

urlpatterns = router.urls
urlpatterns += [
    path('me/token/', views.TokenListView.as_view(), name='token'),
    path('me/followers/', views.FollowerListView.as_view(), name='follower'),
    path('me/followings/', views.FollowingListView.as_view(), name='following'),
]
