from rest_framework import serializers

from core.models import Post


class PostSerializer(serializers.ModelSerializer):
    """serializes the posts model"""

    class Meta:
        model = Post
        fields = "__all__"