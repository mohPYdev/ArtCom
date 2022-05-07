from djoser.views import UserViewSet
from djoser.permissions import CurrentUserOrAdmin

import json

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework import viewsets
from rest_framework import status
from rest_framework.exceptions import ValidationError

from rest_framework.permissions import IsAuthenticated, AllowAny

from users.serializers import ArtistCreatePasswordRetypeSerializer, ArtistUpdateSerializer, \
                              CustomUserSerializer, TokenSerializer, FollowerSerializer, \
                              FollowingSerializer

from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from core.models import Artist, InviteToken, Follow, Rate
from django.contrib.auth import get_user_model
User = get_user_model()

class UserViewSet(UserViewSet):
    """
    Custom UserViewSet that allows us to override the default serializer
    """

    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def perform_update(self, serializer):
        super(viewsets.ModelViewSet, self).perform_update(serializer)


    def get_serializer_class(self):
        """
        Return the appropriate serializer class
        """
        if self.action == 'artist_register':
            return ArtistCreatePasswordRetypeSerializer

        
        serializer = super().get_serializer_class()

        if self.action == 'me':
            if self.request.user.is_artist:
                return ArtistUpdateSerializer
            return CustomUserSerializer
        
        return serializer


    @action(detail=False, methods=["POST"], url_path="artist", permission_classes=[AllowAny])
    def artist_register(self, request):
        """
        Register a new artist
        """
        serializer = ArtistCreatePasswordRetypeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        super().perform_create(serializer)
        return Response(serializer.data, status=201)

    @action(detail=True, methods=["GET"], url_path="profile", permission_classes=[IsAuthenticated])
    def profile(self, request, id=None):
        
        user = User.objects.get(id=id)
        if user.is_artist:
            serializer = ArtistUpdateSerializer(user, context={'request': request})
        else:
            serializer = CustomUserSerializer(user)
        
        return Response(serializer.data, status=200)

    @action(detail=True, methods=["POST"], url_path="follow", permission_classes=[IsAuthenticated])
    def follow(self, request, id=None):
        
        user = User.objects.get(id=id)
        if user.is_artist:
            if Follow.objects.filter(artist=user.artist, user=request.user).exists():
                return Response({'error':'you cannot follow someone twice'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                Follow.objects.create(artist=user.artist, user=request.user)
                user.artist.follower_count += 1
                user.artist.save()
                request.user.following_count += 1
                request.user.save()
                return Response(status=status.HTTP_200_OK)
        return Response({'error':'followee must be an artist'}, status=400)


    @action(detail=True, methods=["POST"], url_path="unfollow", permission_classes=[IsAuthenticated])
    def unfollow(self, request, id=None):
        
        user = User.objects.get(id=id)
        if user.is_artist:
            if Follow.objects.filter(artist=user.artist, user=request.user).exists():
                Follow.objects.get(artist=user.artist, user=request.user).delete()
                user.artist.follower_count -= 1
                user.artist.save()
                request.user.following_count -= 1
                request.user.save()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response({'error': 'you cannot unfollow someone who is not your following'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error':'unfollowee must be an artist'}, status=400)

    @action(detail=True, methods=["POST"], url_path="rate", permission_classes=[IsAuthenticated])
    def rate(self, request, id=None):
        
        user = User.objects.get(id=id)
        if user.is_artist:
            if Rate.objects.filter(artist=user.artist, user=request.user).exists():
                r = Rate.objects.get(artist=user.artist, user=request.user)
                r.star = request.data['star']
                r.save()
            else:
                Rate.objects.create(artist=user.artist, user=request.user, star=request.data['star'])
            return Response(status=status.HTTP_200_OK) 
        return Response({'error':'rated user must be an artist'}, status=400)
    


class TokenListView(ListAPIView):
    """
    List all tokens
    """
    queryset = InviteToken.objects.all()
    serializer_class = TokenSerializer

    def get_queryset(self):
        """
        Filter the queryset by the user
        """
        if self.request.user.is_artist:
            return self.queryset.filter(artist=self.request.user.artist, user=None)
        raise ValidationError(detail='You are not an artist', code=status.HTTP_400_BAD_REQUEST)

class FollowerListView(ListAPIView):
    """
    List all followers
    """
    queryset = Follow.objects.all()
    serializer_class = FollowerSerializer
    permission_classes = [CurrentUserOrAdmin]

    def get_queryset(self):
        """
        Filter the queryset by the user
        """
        if self.request.user.is_artist:
            return self.queryset.filter(artist=self.request.user.artist)
        raise ValidationError(detail='You are not an artist', code=status.HTTP_400_BAD_REQUEST)

class FollowingListView(ListAPIView):
    """
    List all followers
    """
    queryset = Follow.objects.all()
    serializer_class = FollowingSerializer
    permission_classes = [CurrentUserOrAdmin]

    def get_queryset(self):
        """
        Filter the queryset by the user
        """
        return self.queryset.filter(user=self.request.user)
