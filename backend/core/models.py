from typing_extensions import Required
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser


from datetime import date
import os
import uuid

def upload_user_image_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}_{instance.username}.{ext}'
    return os.path.join('uploads/user', filename)

def upload_post_image_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'
    return os.path.join('uploads/post', filename)


class User(AbstractUser):
    city = models.CharField(max_length=40, blank=True)
    address = models.CharField(max_length=255, blank=True)
    postal_code = models.CharField(max_length=80, blank=True)
    image = models.ImageField(upload_to=upload_user_image_path, null=True, blank=True)
    is_artist = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'username'

    REQUIRED_FIELDS = ['email',]

    def __str__(self) -> str:
        return self.username + ' ' + str(self.id)


class Artist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    description = models.CharField(max_length=255, blank= True)
    profession = models.CharField(max_length=255, blank=True)



    def __str__(self) -> str:
        return self.user.username

class Post(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_post_image_path, null=True)
    name = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    date_added = models.DateField(auto_now_add=True)
    price = models.DecimalField(max_digits=7,decimal_places=2, blank=True)
    for_sale = models.BooleanField(default=False)
    sold = models.BooleanField(default=False)


class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Follow(models.Model):
    user = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, related_name='followers', on_delete=models.CASCADE)


class Rate(models.Model):
    artist = models.ForeignKey(Artist, related_name='rate_receivers', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='rates_givers', on_delete=models.CASCADE)
    star = models.PositiveSmallIntegerField(default=1)


class Auction(models.Model):
    artist = models.ManyToManyField(Artist)
    post = models.ManyToManyField(Post)
    date_created = models.DateField(auto_now_add=True)
    date = models.DateField(default=date.today)


class Exhibition(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    posts = models.ManyToManyField(Post)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ManyToManyField(Post)
    transaction_id = models.CharField(max_length=300 , null=True)
    date_ordered = models.DateField(auto_now_add=True , null=True)


class Shipping(models.Model):
    user = models.ForeignKey(User , on_delete=models.SET_NULL , null=True)
    order = models.ForeignKey(Order , on_delete=models.SET_NULL , null=True)


class InviteToken(models.Model):
    artist  = models.ForeignKey(Artist, related_name='inviters', on_delete=models.CASCADE)  
    user = models.ForeignKey(Artist, related_name='invitees', on_delete=models.CASCADE, null=True, blank=True)
    token = models.CharField(default=uuid.uuid4, max_length=100)



# signal for creating 5 tokens for each artist
@receiver(post_save, sender=Artist)
def saveToken(sender , instance , created ,  **kwargs):
    if created:
        InviteToken.objects.create(artist=instance)
        InviteToken.objects.create(artist=instance)
        InviteToken.objects.create(artist=instance)
        InviteToken.objects.create(artist=instance)
        InviteToken.objects.create(artist=instance)
post_save.connect(saveToken , sender = Artist)