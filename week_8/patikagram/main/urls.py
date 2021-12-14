
from django.urls import path,include

from rest_framework.routers import DefaultRouter

from .views import UserViewSet,PostsViewSet,LikeViewSet,CommentsViewSet

router = DefaultRouter()
router.register(r'users',UserViewSet, basename='user')
router.register(r'Posts',PostsViewSet, basename='post')
router.register(r'like',LikeViewSet, basename='like')
router.register(r'comment',CommentsViewSet, basename='comment')

urlpatterns = [
    path('',include(router.urls)),
]