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
from core.models import InviteToken
from core.models import Artist

FOLLOW_API = "/auth/users/{}/follow/"


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

class AuthenticatedUserApiTests(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        self.user  = create_user(**sample_user1)
        artistUser = create_user(**sample_user2, is_artist = True)
        self.artist = Artist.objects.create(user = artistUser)
        self.client.force_authenticate(user=self.user)

    def test_follow_Api(self):
        request_body = {
            "username": "2string",
            "city": "2string",
            "address": "2string",
            "postal_code": "2string",
            "first_name": "2string",
            "last_name": "2string"
        }
        print(self.artist)
        print(str(self.artist.user.id))
        response = self.client.post(FOLLOW_API.format(str(self.artist.user.id)), request_body)
        print(response.data)
        self.assertEqual(200, response.status_code)

