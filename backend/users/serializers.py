from djoser.serializers import UserCreateSerializer, UserSerializer, UserCreatePasswordRetypeSerializer
from rest_framework import serializers

from rest_framework.fields import CurrentUserDefault


from django.contrib.auth import get_user_model

from core.models import Artist, InviteToken, Follow, Rate

User = get_user_model()



class CustomUserCreatePasswordRetypeSerializer(UserCreatePasswordRetypeSerializer):
    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        model = User
        fields = UserCreatePasswordRetypeSerializer.Meta.fields + ('city', 'address', 'postal_code', 'image', 'first_name', 'last_name')

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if attrs['email'] == '':
            raise serializers.ValidationError("Email is required")
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError("Email already exists")
        return attrs


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = InviteToken
        fields = ('token',)


class ArtistTokenSerializer(serializers.ModelSerializer):
    inviters = TokenSerializer(required=True)
    class Meta:
        model = Artist
        fields = ('description', 'profession', 'inviters')


class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = UserSerializer.Meta.fields + ('city', 'address', 'postal_code', 'image', 'first_name', 'last_name', 'is_artist', 'following_count', 'is_superuser')
        read_only_fields = ['is_artist', 'email', 'following_count', 'is_superuser']


class ArtistSerializer(serializers.ModelSerializer):
    class Meta():
        model = Artist
        fields = ('description', 'profession', 'follower_count', 'average_rating','followed', 'rated')
        read_only_fields = ['follower_count', 'average_rating', 'followed', 'rated']
        
    average_rating = serializers.SerializerMethodField()
    followed = serializers.SerializerMethodField()
    rated = serializers.SerializerMethodField()
    def get_average_rating(self, ob):
        return round(ob.average_rating())
    
    def get_followed(self, ob):
        user = self.context['request'].user
        if user.is_authenticated:
            return Follow.objects.filter(artist=ob, user=user).exists()
        return False
    
    def get_rated(self, ob):
        user = self.context['request'].user
        if user.is_authenticated:
            if Rate.objects.filter(artist=ob, user=user).exists():
                return Rate.objects.get(artist=ob, user=user).star
        return None

class ArtistUpdateSerializer(CustomUserSerializer):

    artist = ArtistSerializer(required=True)
    class Meta(CustomUserSerializer.Meta):
        model = User
        fields = CustomUserSerializer.Meta.fields + ('artist',)
        

    def update(self, instance, validated_data):
        artist_data = validated_data.pop('artist')
        instance.artist.description = artist_data['description']
        instance.artist.profession = artist_data['profession']
        instance.artist.save()
        return super().update(instance, validated_data)
    

class ArtistCreatePasswordRetypeSerializer(CustomUserCreatePasswordRetypeSerializer):

    artist = ArtistTokenSerializer(required=True)
    class Meta(CustomUserCreatePasswordRetypeSerializer.Meta):
        model = User
        fields = CustomUserCreatePasswordRetypeSerializer.Meta.fields + ('artist',)


    def create(self, validated_data):
        artist_data = validated_data.pop('artist')
        token_data = artist_data.pop('inviters')
        try:
            token = InviteToken.objects.get(token=token_data['token'])
            if token.user:
                raise serializers.ValidationError("Token already used")
            # create user
            user = super().create(validated_data)
            user.is_artist = True
            user.save()

            # create artist
            artist = Artist.objects.create(
                user = user,
                description = artist_data['description'],
                profession = artist_data['profession'],
            )

            # assign the artist to the token
            token.user = artist
            token.save()

        except InviteToken.DoesNotExist and KeyError:
            raise serializers.ValidationError("Invalid token")     
        
        return user
    
    def validate(self, data):
        artist = data.pop('artist')
        if artist['profession'] == '':
            raise serializers.ValidationError("Profession is required")
        if data['email'] == '':
            raise serializers.ValidationError("Email is required")
        data =  super().validate(data)
        data['artist'] = artist
        return data
        

class UserFollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'image', 'id')

class FollowerSerializer(serializers.ModelSerializer):

    user = UserFollowSerializer(required=True)
    class Meta:
        model = Follow
        fields = ('user',)


class ArtistFollowSerializer(serializers.ModelSerializer):

    user = UserFollowSerializer(required=True)
    class Meta:
        model = Artist
        fields = ('user', 'profession')

class FollowingSerializer(serializers.ModelSerializer):

    artist = ArtistFollowSerializer(required=True)
    class Meta:
        model = Follow
        fields = ('artist',)