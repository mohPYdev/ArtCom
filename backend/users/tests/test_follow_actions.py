import cmd
import email
import copy
from urllib import response
from wsgiref.util import request_uri
from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from users import serializers, views

from django.contrib.auth import get_user_model
from core.models import Follow, Artist, Rate

FOLLOW_API = "/auth/users/{}/follow/"
GET_FOLLOWERS_API = "/auth/me/followers/"
GET_FOLLOWINGS_API = "/auth/me/followings/"
UNFOLLOW_API = "/auth/users/{}/unfollow/"
RATE_API = "/auth/users/{}/rate/"
UsersRepository = get_user_model()

def create_user(**params):
    return UsersRepository.objects.create_user(**params)

sample_user1 = {
            "email": "user1@example.com",
            "username": "1string",
            "password": "alaki1234",
            "city": "1string",
            "address": "1string",
            "postal_code": "1string",
            "first_name": "1string",
            "last_name": "1string"
        }

sample_user2 = {
            "email": "user2@example.com",
            "username": "2string",
            "password": "alaki1234",
            "city": "2string",
            "address": "2string",
            "postal_code": "2string",
            "first_name": "2string",
            "last_name": "2string"
        }

request_body1 = {
            "username": "1string",
            "city": "1string",
            "address": "1string",
            "postal_code": "1string",
            "first_name": "1string",
            "last_name": "1string"
        }


request_body2 = {
            "username": "2string",
            "city": "2string",
            "address": "2string",
            "postal_code": "2string",
            "first_name": "2string",
            "last_name": "2string"
        }
class FollowApiTests(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        self.user  = create_user(**sample_user1)
        artistUser = create_user(**sample_user2, is_artist = True)
        self.artist = Artist.objects.create(user = artistUser)
        self.client.force_authenticate(user=self.user)

    def test_follow_Api(self):
        response = self.client.post(FOLLOW_API.format(str(self.artist.user.id)), request_body2)
        self.assertEqual(200, response.status_code)

    def test_follow_twice(self):
        response = self.client.post(FOLLOW_API.format(str(self.artist.user.id)), request_body2)
        self.assertEqual(200, response.status_code)
        response = self.client.post(FOLLOW_API.format(str(self.artist.user.id)), request_body2)
        self.assertEqual(400, response.status_code)

    def test_follow_bad_user(self):
        self.client.force_authenticate(user=self.artist.user)
        response = self.client.post(FOLLOW_API.format(str(self.user.id)), request_body1)
        self.assertEqual(400, response.status_code)

class GetFollowApiTest(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        self.user  = create_user(**sample_user1)
        artistUser = create_user(**sample_user2, is_artist = True)
        self.artist = Artist.objects.create(user = artistUser)
        Follow.objects.create(user = self.user, artist = self.artist)

    def test_get_one_follower(self):
        self.client.force_authenticate(user=self.artist.user)
        response = self.client.get(GET_FOLLOWERS_API)
        self.assertEqual(1, response.data[0]['user']['id'])
        self.assertEqual(1, len(response.data))
    
    def test_get_one_following(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(GET_FOLLOWINGS_API)
        self.assertEqual(2, response.data[0]['artist']['user']['id'])
        self.assertEqual(1, len(response.data))

    def test_rate(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(RATE_API.format(self.artist.user.id), {'star':4})
        self.assertEqual(200, response.status_code)
        self.assertEqual(4, Rate.objects.get(user = self.user, artist = self.artist).star)


class UnfollowApiTest(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        self.user  = create_user(**sample_user1)
        artistUser = create_user(**sample_user2, is_artist = True)
        self.artist = Artist.objects.create(user = artistUser)
        Follow.objects.create(user = self.user, artist = self.artist)
        self.client.force_authenticate(user=self.user)

    def test_unfollow_api(self):
        response = self.client.post(UNFOLLOW_API.format(str(self.artist.user.id)), request_body2)
        self.assertEqual(200, response.status_code)

    def test_unfollow_non_following(self):
        response = self.client.post(UNFOLLOW_API.format(str(self.artist.user.id)), request_body2)
        self.assertEqual(200, response.status_code)
        response = self.client.post(UNFOLLOW_API.format(str(self.artist.user.id)), request_body2)
        self.assertEqual(400, response.status_code)


        

