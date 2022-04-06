from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .permissions import IsArtist
from core.models import Post, Like
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

    def get_queryset(self):
        user_pk = self.kwargs['user_pk']
        user = User.objects.get(id=user_pk)
        return Post.objects.filter(artist=user.artist)


class PostDetailView(generics.RetrieveAPIView):
    """detail veiw of the post"""

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_object(self):
        user_pk = self.kwargs['user_pk']
        post_pk = self.kwargs['post_pk']
        user = User.objects.get(id=user_pk)
        obj = get_object_or_404(Post, pk=post_pk, artist=user.artist)
        return obj

class PostLikeView(generics.CreateAPIView):
    """
    API endpoint that allows users to like a post.
    """
    queryset = Like.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        user = self.request.user
        post = self.get_object()

        if Like.objects.filter(user=user, post=post).exists():
            return Response({'error':'you cannot like a post twice'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            Like.objects.create(user=user, post=post)
            return Response(status=status.HTTP_200_OK)
        

    def get_object(self):
        user_pk = self.kwargs['user_pk']
        post_pk = self.kwargs['post_pk']
        user = User.objects.get(id=user_pk)
        obj = get_object_or_404(Post, pk=post_pk, artist=user.artist)
        return obj

        