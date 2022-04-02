from djoser.serializers import UserCreateSerializer, UserSerializer, UserCreatePasswordRetypeSerializer
from rest_framework import serializers


from django.contrib.auth import get_user_model

from core.models import Artist, InviteToken

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = UserCreateSerializer.Meta.fields + ('city', 'address', 'postal_code', 'image', )


class CustomUserCreatePasswordRetypeSerializer(UserCreatePasswordRetypeSerializer):
    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        model = User
        fields = UserCreatePasswordRetypeSerializer.Meta.fields + ('city', 'address', 'postal_code', 'image', 'first_name', 'last_name')


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = InviteToken
        fields = ('token',)
        # extra_kwargs = {'token': {'required': True}}

class ArtistSerializer(serializers.ModelSerializer):
    inviters = TokenSerializer(required=True)
    class Meta:
        model = Artist
        fields = ('description', 'profession', 'inviters')


class ArtistCreatePasswordRetypeSerializer(CustomUserCreatePasswordRetypeSerializer):

    artist = ArtistSerializer(required=True)
    class Meta(CustomUserCreatePasswordRetypeSerializer.Meta):
        model = User
        fields = CustomUserCreatePasswordRetypeSerializer.Meta.fields + ('artist',)

    def create(self, validated_data):
        artist_data = validated_data.pop('artist')
        token_data = artist_data.pop('inviters')
        try:
            token = InviteToken.objects.get(token=token_data['token'])

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

        except InviteToken.DoesNotExist:
            raise serializers.ValidationError("Invalid token")     
        
        return user
    
    def validate(self, data):
        artist = data.pop('artist')
        data =  super().validate(data)
        data['artist'] = artist
        return data
        
        