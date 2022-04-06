from rest_framework import viewsets
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model

from .permissions import IsArtist
from core.models import Post
from post.serializers import PostSerializer

User = get_user_model()

class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows posts to be viewed or edited.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsArtist,)
    

    def perform_create(self, serializer):
        serializer.save(artist=self.request.user.artist)

    def get_queryset(self):
        return Post.objects.filter(artist=self.request.user.artist)


class PostListView(generics.ListAPIView):
    """
    API endpoint that allows posts to be viewed.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self, pk=None):
        user = User.objects.get(id=pk)
        return Post.objects.filter(artist=user.artist)
