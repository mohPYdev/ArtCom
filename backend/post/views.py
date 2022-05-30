from rest_framework.serializers import ValidationError
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .permissions import IsArtist, IsCurrentUserArtist
from core.models import Post, Like, Exhibition, Auction, Order, Comment
from post.serializers import PostSerializer, LikeSerializer, ExhibitionSerializer,\
                             ExhibitionCreateSerializer, AuctionCreateSerializer,\
                             AuctionSerializer,\
                             AuctionArtistSerializer, PostPaymentSerializer,\
                             OrderSerializer, CommentCreateSerializer, CommentSerializer

User = get_user_model()

class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows posts to be viewed or edited.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsArtist,)
    

    def perform_create(self, serializer):
        serializer.save(artist=self.request.user.artist)

    def get_queryset(self):
        if self.action == 'me':
            return Post.objects.filter(artist=self.request.user.artist)
        return Post.objects.all()
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated,]
        else:
            permission_classes = [IsArtist,]
        return [permission() for permission in permission_classes]


    @action(detail=False, methods=['GET'], url_name='me' )
    def me(self, request):
        return self.list(request)
    
    
class PostListView(generics.ListAPIView):
    """
    API endpoint that allows posts to be viewed.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user_pk = self.kwargs['user_pk']
        user = User.objects.get(id=user_pk)
        return Post.objects.filter(artist=user.artist)


class PostDetailView(generics.RetrieveAPIView):
    """detail veiw of the post"""

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_object(self):
        user_pk = self.kwargs['user_pk']
        post_pk = self.kwargs['post_pk']
        user = User.objects.get(id=user_pk)
        obj = get_object_or_404(Post, pk=post_pk, artist=user.artist)
        return obj


class PostLikeView(generics.CreateAPIView):
    """
    API endpoint that allows users to like a post.
    """
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        post = self.get_object()

        if Like.objects.filter(user=user, post=post).exists():
            return Response({'error':'you cannot like a post twice'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            Like.objects.create(user=user, post=post)
            return Response(status=status.HTTP_200_OK)
        
    def get_object(self):
        user_pk = self.kwargs['user_pk']
        post_pk = self.kwargs['post_pk']
        user = User.objects.get(id=user_pk)
        obj = get_object_or_404(Post, id=post_pk, artist=user.artist)
        return obj


class PostDislikeView(generics.CreateAPIView):

    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        post = self.get_object()

        if Like.objects.filter(user=user, post=post).exists():
            Like.objects.filter(user=user, post=post).delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response({'error':'you cannot dislike a post twice'}, status=status.HTTP_400_BAD_REQUEST)

    def get_object(self):
        user_pk = self.kwargs['user_pk']
        post_pk = self.kwargs['post_pk']
        user = User.objects.get(id=user_pk)
        obj = get_object_or_404(Post, id=post_pk, artist=user.artist)
        return obj


class PostPayView(generics.CreateAPIView):
    """view for doing the payment """

    queryset = Post.objects.all()
    serializer_class = PostPaymentSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        user = self.request.user
        post = self.get_object()
        order = Order.objects.get(user=user, post=post)
        post.sold = True
        post.for_sale = False
        order.is_paid = True
        order.save()
        post.save()
        return Response(status=status.HTTP_200_OK)
    
    def get_object(self):
        # user_pk = self.kwargs['user_pk']
        post_pk = self.kwargs['post_pk']
        # user = User.objects.get(id=user_pk)
        obj = get_object_or_404(Post, id=post_pk)
        return obj


class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows comments to be viewed or edited.
    """
    queryset = Comment.objects.all()
    serializer_class = CommentCreateSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 

    def get_queryset(self):
        if self.action == 'comment_post':
            post = Post.objects.get(id=self.kwargs['pk'])
            return Comment.objects.filter(post=post)
        return self.queryset

    def get_serializer_class(self):
        if self.action == 'comment_post':
            return CommentSerializer
        return self.serializer_class
    

    @action(detail=True, methods=['GET'], url_name='post' )
    def comment_post(self, request, pk):
        return self.list(request)

   

class OrderViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows orders to be viewed or edited.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    

    



class ExhibitionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows posts to be viewed or edited.
    """
    queryset = Exhibition.objects.all()
    serializer_class = ExhibitionSerializer
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def perform_create(self, serializer):
        serializer.save(artist=self.request.user.artist)
    
    def get_serializer_class(self):
        if self.action in ['create' , 'update', 'partial_update']:
            return ExhibitionCreateSerializer
        return self.serializer_class

    def get_queryset(self):
        if self.action in ['me', 'update', 'partial_update', 'destroy']:
            return self.queryset.filter(artist=self.request.user.artist)
        # elif self.action == 'list':
        #     return (x for x in self.queryset.all() if x.get_status() in ['open' , 'ns'])
        return self.queryset

    def get_object(self):
        obj = super().get_object()
        if self.action in [ 'update', 'partial_update']:
            obj = get_object_or_404(Exhibition, pk=self.kwargs['pk'], artist=self.request.user.artist)
            if obj.get_status() == 'ns':
                return obj
            else:
                raise ValidationError({'detail':'you cannot update an open or closed exhibition'})
        elif self.action == 'retrieve':
            obj = get_object_or_404(Exhibition, pk=self.kwargs['pk'])
            if obj.get_status() == 'open' or obj.artist == self.request.user.artist:
                return obj
            else:
                raise ValidationError({'detail':'the exhibition is not open or you are not the artist'})
        return obj

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated,]
        else:
            permission_classes = [IsCurrentUserArtist,]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'], url_path='me', permission_classes=[IsArtist])
    def me(self, request):
        return self.list(request)
    

class AuctionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows auction to be viewed or edited.
    """
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    permission_classes = (IsAuthenticated,)

    
    def get_serializer_class(self):
        if self.action in ['create' , 'update', 'partial_update']:
            return AuctionCreateSerializer
        elif self.action in ['add_post', 'remove_post']:
            return AuctionArtistSerializer
        return self.serializer_class

    def get_queryset(self):
        if self.action == 'list':
            return (x for x in self.queryset.all() if x.get_status() in ['open' , 'ns'])
        return self.queryset

    def get_object(self):
        obj = super().get_object()
        if self.action in ['remove-artist','remove_post']:
            obj = get_object_or_404(Auction, pk=self.kwargs['pk'])
            if obj.get_status() == 'ns':
                return obj
            else:
                raise ValidationError({'detail':'you cannot update an open or closed auction'})
        
        elif self.action in ['add-artist', 'add_post']:
            obj=  get_object_or_404(Auction, pk=self.kwargs['pk'])
            if obj.get_status() == 'ns':
                return obj
            else:
                raise ValidationError({'detail':'you cannot update an open or closed auction'})
        
                
        elif self.action == 'retrieve':
            obj = get_object_or_404(Auction, pk=self.kwargs['pk'])
            if obj.get_status() == 'open' and self.request.user.wallet > 100000:
                return obj
            else:
                raise ValidationError({'detail':'the auction is not open or you have not enough money'})
        return obj
    
    def get_permissions(self):
        permission_classes = self.permission_classes
        if self.action in ['create', 'destroy', 'update', 'partial_update']:
            permission_classes = [IsAdminUser,]
        elif self.action in ['add_post', 'remove_post']:
            permission_classes = [IsArtist,]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['POST'], url_path='add-post', permission_classes=[IsArtist])
    def add_post(self, request, pk=None):
        auction = self.get_object()
        serializer = self.get_serializer(auction, data=request.data)
        if serializer.is_valid():
            if auction.post.filter(id__in=request.data['post']).exists():
                raise ValidationError({'detail':'you have already added this post'})
            serializer.save()
            return Response(status=status.HTTP_200_OK, data=serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['post'], url_path='remove-post', permission_classes=[IsArtist])
    def remove_post(self, request, pk=None):
        auction = self.get_object()
        serializer = self.get_serializer(auction, data=request.data)
        if serializer.is_valid():
            if auction.post.filter(id__in=request.data['post']).exists():
                for post in request.data['post']:
                    auction.post.remove(post)
                auction.save()
                return Response(status=status.HTTP_200_OK)
            else:
                raise ValidationError({'detail':'you have not added this post'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)