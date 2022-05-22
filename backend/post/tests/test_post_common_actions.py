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
      self.assertEqual(2, len(response.data))
