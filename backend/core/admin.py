from django.contrib import admin
from core import models

# Register your models here.

admin.site.register(models.User)
admin.site.register(models.Artist)
admin.site.register(models.Like)
admin.site.register(models.Follow)
admin.site.register(models.InviteToken)
admin.site.register(models.Post)
admin.site.register(models.Exhibition)
admin.site.register(models.Auction)
admin.site.register(models.Rate)
