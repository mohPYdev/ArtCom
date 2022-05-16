from email.policy import default
from typing_extensions import Required
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

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
    following_count = models.IntegerField(default=0)
    
    USERNAME_FIELD = 'username'

    REQUIRED_FIELDS = ['email',]

    def __str__(self) -> str:
        return self.username + ' ' + str(self.id)


class Artist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    description = models.CharField(max_length=255, blank= True)
    profession = models.CharField(max_length=255, blank=True)
    follower_count = models.IntegerField(default=0)

    def average_rating(self):
        ratings = Rate.objects.filter(artist=self)
        if len(ratings) == 0:
            return 1
        return sum(r.star for r in ratings) / len(ratings)


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

    def __str__(self) -> str:
        return self.name + ' ' + str(self.id)


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
    artist = models.ManyToManyField(Artist, blank=True)
    post = models.ManyToManyField(Post, blank=True)
    date_created = models.DateField(auto_now_add=True)
    date_begin = models.DateTimeField(default=timezone.now)
    date_end = models.DateTimeField(default=timezone.now)

    def get_status(self):
        if self.date_begin > timezone.now():
            return 'ns'
        elif self.date_end < timezone.now():
            return 'finished'
        else:
            return 'open'


class Exhibition(models.Model):

    title = models.CharField(max_length=255, blank=True)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    posts = models.ManyToManyField(Post)
    date_begin = models.DateTimeField(default=timezone.now)
    date_end = models.DateTimeField(default=timezone.now)
    cover = models.ImageField(upload_to=upload_post_image_path, null=True)
    

    def get_status(self):
        if self.date_begin > timezone.now():
            return 'ns'
        elif self.date_end < timezone.now():
            return 'finished'
        else:
            return 'open'


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    transaction_id = models.CharField(max_length=300 , null=True)
    date_ordered = models.DateField(auto_now_add=True , null=True)
    is_shipped = models.BooleanField(default=False)
    is_paid = models.BooleanField(default=False)


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