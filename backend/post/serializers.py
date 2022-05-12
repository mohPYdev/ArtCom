from rest_framework import serializers

from users.serializers import ArtistFollowSerializer
from core.models import Post, Like, Exhibition, Artist, Auction, Order

from django.utils.timezone import now
from django.contrib.auth import get_user_model


User = get_user_model()


class PostSerializer(serializers.ModelSerializer):
    """serializes the posts model"""
    artist = ArtistFollowSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'image', 'name', 'description', 'price', 'for_sale', 'sold', 'artist', 'like_count', 'liked', 'date_added')
        read_only_fields = ('id', 'artist', 'like_count', 'sold', 'date_added')

    liked = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()

    def get_liked(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return Like.objects.filter(post=obj, user=user).exists()
        return False
    
    def get_like_count(self, obj):
        return obj.like_set.count()


class PostPaymentSerializer(serializers.ModelSerializer):
    """serializes the posts model for the payment updating"""

    class Meta:
        model = Post
        fields = ('id', 'sold',)


class OrderSerializer(serializers.ModelSerializer):
    """serializes the order model"""
    # post = PostSerializer(queryset=Post.objects.all(), many=False)
    # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=False)

    class Meta:
        model = Order
        fields = ('id', 'post', 'user', 'date_ordered', 'is_paid', 'is_shipped')
        read_only_fields = ('id','date_ordered')
    


class PostExhSerializer(serializers.ModelSerializer):
    """serializes the posts model for the exhibition"""

    class Meta:
        model = Post
        fields = ('id', 'image', 'name')


class ExhibitionCreateSerializer(serializers.ModelSerializer):
    """serializer for creating exhibition by an artist"""
    posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all())
    date_begin = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    date_end = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    class Meta:
        model = Exhibition
        fields = ('posts', 'date_begin', 'date_end','cover')

    def validate(self, attrs):
        attr =  super().validate(attrs)
        if not self.context['request'].user.is_artist:
            raise serializers.ValidationError('You are not an artist')
        if attr['date_begin'] > attr['date_end']:
            raise serializers.ValidationError('date_begin must be before date_end')
        if attr['date_begin'] < now():
            raise serializers.ValidationError('date_begin must be after now')
        if attr['date_end'] < now():
            raise serializers.ValidationError('date_end must be after now')
        for post in attr['posts']:
            if post.artist != self.context['request'].user.artist:
                raise serializers.ValidationError('post must belong to the artist')
        
        return attr
        
class ExhibitionSerializer(serializers.ModelSerializer):
    """serializes the exhibitions model"""
    artist = serializers.PrimaryKeyRelatedField(many=False, read_only = True)
    posts = PostExhSerializer(many=True, read_only=True)
    status = serializers.SerializerMethodField()

    def get_status(self, obj):
        return obj.get_status()
    class Meta:
        model = Exhibition
        fields = ('id', 'artist', 'posts', 'date_begin', 'date_end', 'status', 'cover')
        read_only_fields = ('id', 'artist')

class LikeSerializer(serializers.ModelSerializer):
    """serializes the likes model"""
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Like
        fields = ('id', 'user')
        read_only_fields = ('id',  'user')


class AuctionCreateSerializer(serializers.ModelSerializer):
    """serializer for creating an auction by the admin"""

    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all(), many=True)
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all(), many=True)

    date_begin = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    date_end = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Auction
        fields = ('post', 'artist', 'date_begin', 'date_end')



# class AuctionListSerializer(serializers.ModelSerializer):
#     """serializes the auctions model"""
#     post = PostSerializer(many=True, read_only=True)
#     status = serializers.SerializerMethodField()

#     def get_status(self, obj):
#         return obj.get_status()
#     class Meta:
#         model = Auction
#         fields = ('id',  'post', 'date_begin', 'date_end', 'status')
#         read_only_fields = ('id',)


class AuctionSerializer(serializers.ModelSerializer):

    post = PostSerializer(many=True, read_only=True)
    status = serializers.SerializerMethodField()

    def get_status(self, obj):
        return obj.get_status()

    class Meta:
        model = Auction
        fields = ('id','post', 'date_begin', 'date_end', 'status')
        read_only_fields = ('id', 'date_begin', 'date_end', 'status')

class AuctionArtistSerializer(serializers.ModelSerializer):
    """serializer for adding or deleting posts to an auction by an artist"""

    post = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all())
    class Meta:
        model = Auction
        fields = ('post',)
    
    def validate(self, attrs):
        attr =  super().validate(attrs)
        for post in attr['post']:
            if post.artist != self.context['request'].user.artist:
                raise serializers.ValidationError('post must belong to the artist')
        return attr
    
    def update(self, instance, validated_data):
        for post in validated_data['post']:
            instance.post.add(post.id)
        instance.save()
        return instance