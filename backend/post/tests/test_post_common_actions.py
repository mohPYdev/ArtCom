import cmd
import email
import copy
from django.test import TestCase

from rest_framework.test import APIClient
from rest_framework import status

from django.contrib.auth import get_user_model
from core.models import Post
from core.models import Artist

UsersClass = get_user_model()

POST_URL = "/post/posts/"
GET_POST_URL = "/post/{}/posts/"
COMMENT_URL = "/post/comments/"
LIKE_URL = "/post/{}/posts/{}/like/"

def create_user(**params):
    return UsersClass.objects.create_user(**params)

def create_user_artist(**params):
    return UsersClass.objects.create_user(**params, is_artist = True)

sample_user = {
            "email": "user@example.com",
            "username": "string",
            "password": "alaki1234",
            "city": "string",
            "address": "string",
            "postal_code": "string",
            "first_name": "string",
            "last_name": "string"
        }

sample_post = {
  "name": "string",
  "description": "string",
  "price": "10000",
  "for_sale": True,
  "artist": {
    "user": {
      "username": "string"
    },
    "profession": "string"
  }
}

class PostUrlTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.artistUser = create_user_artist(**sample_user)
        self.artist = Artist.objects.create(user = self.artistUser)
        self.client.force_authenticate(user=self.artistUser)

    def test_create_post(self):
        self.assertEqual(0, Post.objects.count())
        response = self.client.post(POST_URL, sample_post, format = 'json')
        self.assertEqual(201, response.status_code)
        self.assertEqual(1, Post.objects.count())

    def test_get_post(self):
      Post.objects.create(artist = self.artist, name = "p1", price = "10000")
      Post.objects.create(artist = self.artist, name = "p2", price = "10000")
      Post.objects.create(artist = Artist.objects.create(user = create_user_artist(username = "n")), name = "p3", price = "10000")
      response = self.client.get(POST_URL)
      self.assertEqual(200, response.status_code)
      self.assertEqual(3, len(response.data))
      response = self.client.get(GET_POST_URL.format(str(self.artist.user.id)))
      self.assertEqual(200, response.status_code)
      self.assertEqual(2, len(response.data))

class NormalUserActOnPostTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = create_user(**sample_user)
        self.client.force_authenticate(user=self.user)

    def test_comment(self):
      artist = Artist.objects.create(user = create_user_artist(username = "n"))
      post = Post.objects.create(artist = artist, name = "p3", price = "10000")
      request_body = {
       "text": "hi",
       "post": post.id
      }
      response = self.client.post(COMMENT_URL, request_body, format = 'json')
      self.assertEqual(201, response.status_code)

    def test_like(self):
      artist = Artist.objects.create(user = create_user_artist(username = "n"))
      post = Post.objects.create(artist = artist, name = "p3", price = "10000")
      response = self.client.post(LIKE_URL.format(artist.user.id, post.id))
      self.assertEqual(200, response.status_code)
    

