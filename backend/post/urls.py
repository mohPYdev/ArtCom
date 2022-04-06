from django.urls import path
from rest_framework.routers import DefaultRouter

from post import views

app_name = 'post'

router = DefaultRouter()
router.register("posts", views.PostViewSet)

urlpatterns = router.urls

urlpatterns += [
    path('<int:pk>/posts/', views.PostListView.as_view(), name='post-list'),
]