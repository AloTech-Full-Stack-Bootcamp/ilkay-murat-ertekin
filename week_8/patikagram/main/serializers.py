from rest_framework import serializers

from django.contrib.auth.models import User

from .models import Post, Like, Comment


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    author = serializers.SlugRelatedField(
        slug_field='username',
        read_only=True)

    like_counts_comment = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'image', 'author', 'content',
                  '_likes_count', '_comments_count', 'created_at', 'like_counts_comment']

    def get_like_counts_comment(self, obj):
        return f"Likes: {obj._likes_count} / Comments: {obj._comments_count}"


class LikeSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Like
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Comment
        fields = '__all__'
