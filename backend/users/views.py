from djoser.views import UserViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

from users.serializers import ArtistCreatePasswordRetypeSerializer

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
        return super().get_serializer_class()



    @action(detail=False, methods=["POST"], url_path="artist")
    def artist_register(self, request):
        """
        Register a new artist
        """
        serializer = ArtistCreatePasswordRetypeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)