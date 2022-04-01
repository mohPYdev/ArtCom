from djoser.serializers import UserCreateSerializer, UserSerializer, UserCreatePasswordRetypeSerializer
from rest_framework import serializers

from django.contrib.auth import get_user_model


User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = UserCreateSerializer.Meta.fields + ('city', 'address', 'postal_code', 'image', )


class UserCreatePasswordRetypeSerializer(UserCreatePasswordRetypeSerializer):
    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        model = User
        fields = UserCreatePasswordRetypeSerializer.Meta.fields + ('city', 'address', 'postal_code', 'image', 'first_name', 'last_name')

#TODO: add a serializer for artist model