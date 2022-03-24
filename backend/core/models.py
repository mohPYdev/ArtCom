from email.policy import default
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
                                        PermissionsMixin


from datetime import date
import uuid

class UserManager(BaseUserManager):
    """manager for custom user model"""

    def create_user(self, email, username, password=None, **kwargs):
        """creates a regular user with username password and email """
        if not email or not username:
            raise ValueError('user must have email and username')
        user = self.model(
            email=self.normalize_email(email),
            username=username,
            **kwargs
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, password):
        """creates a super user """
        if not username:
            raise ValueError('superuser must have username!')
        user = self.model(username=username)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, blank=True)
    date_joined = models.DateField(auto_now_add=True)
    city = models.CharField(max_length=40, blank=True)
    address = models.CharField(max_length=255, blank=True)
    postal_code = models.CharField(max_length=80, blank=True)
    # image = models.ImageField(upload_to=)

    is_artist = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()
    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'


class Artist(User):
    description = models.CharField(max_length=255, blank= True)
    profession = models.CharField(max_length=255, blank=True)


class Post(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    # image = models.ImageField(upload_to=)
    name = models.CharField(max_length=255, blank=True)
    description = models.CharField(max_length=255, blank=True)
    date_added = models.DateField(auto_now_add=True)
    price = models.DecimalField(decimal_places=2, blank=True)
    for_sale = models.BooleanField(default=False)
    sold = models.BooleanField(default=False)


class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Follow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)


class Rate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
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
    artist  = models.ForeignKey(Artist , on_delete=models.CASCADE)  
    user = models.ForeignKey(Artist , on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, editable=False)
