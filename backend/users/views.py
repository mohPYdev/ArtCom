from djoser.views import UserViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

from users.serializers import ArtistCreatePasswordRetypeSerializer, ArtistUpdateSerializer, \
                              CustomUserSerializer

class UserViewSet(UserViewSet):
    """
    Custom UserViewSet that allows us to override the default serializer
    """

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



    @action(detail=False, methods=["POST"], url_path="artist")
    def artist_register(self, request):
        """
        Register a new artist
        """
        serializer = ArtistCreatePasswordRetypeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        super().perform_create(serializer)
        return Response(serializer.data, status=201)