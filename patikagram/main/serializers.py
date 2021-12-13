from django.db.models import fields
from rest_framework import serializers

from django.contrib.auth.models import User

from .models import Post,Like,Comment


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model=User
        fields=['id','username','email']  

class LikeSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    
    class Meta:
        model=Like
        fields=['id','created_at','user','post']
    
class CommentSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model=Comment
        fields='__all__'


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model=Post
        fields=['id','image','author','content','_likes_count','_comments_count','created_at']
