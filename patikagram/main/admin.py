from django.contrib import admin

from .models import Post,Like,Comment

# Register your models here.

class CommentAdmin(admin.TabularInline):
    model = Comment
    extra = 1
    readonly_fields=['id','user']
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display=['id','content','author','created_at','_likes_count','_comments_count']
    list_filter=['created_at']
    search_fields=['author__username']
    autocomplete_fields=['author']
    ordering=['created_at']
    inlines=[CommentAdmin]

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display=['id','post','user']

    