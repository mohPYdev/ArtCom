from rest_framework import serializers

from users.serializers import ArtistFollowSerializer
from core.models import Post, Like


class PostSerializer(serializers.ModelSerializer):
    """serializes the posts model"""
    artist = ArtistFollowSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'image', 'name', 'description', 'price', 'for_sale', 'sold', 'artist', 'like_count', 'liked')
        read_only_fields = ('id', 'artist', 'like_count')

    liked = serializers.SerializerMethodField()

    def get_liked(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return Like.objects.filter(post=obj, user=user).exists()
        return False