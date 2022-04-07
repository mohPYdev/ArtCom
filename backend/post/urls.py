from django.urls import path
from rest_framework.routers import DefaultRouter

from post import views

app_name = 'post'

router = DefaultRouter()
router.register("posts", views.PostViewSet)

# urlpatterns = router.urls

urlpatterns = [
    path('<int:user_pk>/posts/', views.PostListView.as_view(), name='post-list'),
    path('<int:user_pk>/posts/<int:post_pk>/', views.PostDetailView.as_view(), name='post-detail'),
    path('<int:user_pk>/posts/<int:post_pk>/like/', views.PostLikeView.as_view(), name='post-like'),
    path('<int:user_pk>/posts/<int:post_pk>/dislike/', views.PostDislikeView.as_view(), name='post-dislike'),
]