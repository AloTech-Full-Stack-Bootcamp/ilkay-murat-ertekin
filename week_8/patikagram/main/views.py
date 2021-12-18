from django.contrib.auth.models import User

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import UserSerializer, PostSerializer, LikeSerializer, CommentSerializer
from .models import Post, Like, Comment



class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class PostsViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['get'])
    def Like(self, request, pk=None):
        post = self.get_object()
        qs = Like.objects.get_or_create(post=post, user=request.user)
        serializer = LikeSerializer(qs[0])
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class LikeViewSet(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    queryset = Like.objects.all()


class CommentsViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
