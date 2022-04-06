from rest_framework import serializers

from users.serializers import ArtistFollowSerializer
from core.models import Post


class PostSerializer(serializers.ModelSerializer):
    """serializes the posts model"""
    artist = ArtistFollowSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'image', 'name', 'description', 'price', 'for_sale', 'sold', 'artist')
        read_only_fields = ('id', 'artist')