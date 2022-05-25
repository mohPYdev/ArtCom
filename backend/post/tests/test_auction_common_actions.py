import cmd
import email
import copy
import imp
from django.test import TestCase
from django.db import models
from django.utils import timezone
from datetime import date, timedelta

from rest_framework.test import APIClient
from rest_framework import status

from django.contrib.auth import get_user_model
from core.models import Auction
from core.models import Post
from core.models import Artist

UsersClass = get_user_model()

ADD_TO_AUCTION_URL = "/post/auctions/{}/add-post/"

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

class AddPostTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.artistUser = create_user_artist(**sample_user)
        self.artist = Artist.objects.create(user = self.artistUser)
        self.client.force_authenticate(user=self.artistUser)

    def test_add_auction_post(self):
      post = Post.objects.create(artist = self.artist, name = "p1", price = "10000")
      auction = Auction.objects.create(date_begin = timezone.now() + timedelta(1), date_end = timezone.now() + timedelta(100))
      body = {
          "post": [post.id]
      }
      response = self.client.post(ADD_TO_AUCTION_URL.format(str(auction.id)), body, format = 'json')
      auction = Auction.objects.get(id = auction.id)
      print(type(auction.post))
      #TODO check Auction Repo
      self.assertEqual(200, response.status_code)

    def test_add_auction_post_closed(self):
      post = Post.objects.create(artist = self.artist, name = "p1", price = "10000")
      auction = Auction.objects.create(date_begin = timezone.now() - timedelta(100), date_end = timezone.now() - timedelta(1))
      body = {
          "post": [post.id]
      }
      response = self.client.post(ADD_TO_AUCTION_URL.format(str(auction.id)), body, format = 'json')
      self.assertEqual(400, response.status_code)

    def test_add_auction_post_running(self):
      post = Post.objects.create(artist = self.artist, name = "p1", price = "10000")
      auction = Auction.objects.create(date_begin = timezone.now() - timedelta(10), date_end = timezone.now() + timedelta(10))
      body = {
          "post": [post.id]
      }
      response = self.client.post(ADD_TO_AUCTION_URL.format(str(auction.id)), body, format = 'json')
      self.assertEqual(400, response.status_code)

    def test_add_auction_post_unvalid_post(self):
      auction = Auction.objects.create(date_begin = timezone.now() + timedelta(1), date_end = timezone.now() + timedelta(100))
      body = {
          "post": [23]
      }
      response = self.client.post(ADD_TO_AUCTION_URL.format(str(auction.id)), body, format = 'json')
      self.assertEqual(400, response.status_code)

