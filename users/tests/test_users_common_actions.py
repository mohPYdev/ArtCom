import cmd
import email
import copy
from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from users import serializers, views

from django.contrib.auth import get_user_model
from core.models import InviteToken
from core.models import Artist

CREATE_USER_URL = reverse('users:user-list')
ME_URL = '/auth/users/me/'
CREATE_ARTIST_URL = '/auth/users/artist/'
USER_URL = '/auth/users/{}/'

UsersClass = get_user_model()

def create_user(**params):
    return get_user_model().objects.create_user(**params)

sample_user = {
            "email": "user@example.com",
            "username": "string",
            "password": "alaki1234",
            "city": "string",
            "address": "string",
            "postal_code": "string",
            "first_name": "string",
            "last_name": "string",
            "re_password": "alaki1234"
        }

sample_artist = {
  "email": "user2@example.com",
  "username": "string2",
  "password": "azxsdcvf",
  "city": "string",
  "address": "string",
  "postal_code": "string2",
  "first_name": "string2",
  "last_name": "string2",
  "artist": {
    "description": "I am good",
    "profession": "sucker",
    "inviters": {
      "token": None
    }
  },
  "re_password": "azxsdcvf"
}

class PublicUserApiTests(TestCase):
    
    def setUp(self) -> None:
        self.client = APIClient()
        self.reques_body = sample_user

    def test_valid_user_creation(self):
        response = self.client.post(CREATE_USER_URL, self.reques_body)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

        body = response.json()
        del body["image"]
        user = get_user_model().objects.get(**body)

        self.assertEqual(self.reques_body['address'], user.address)
        self.assertFalse(hasattr(user, 're_password'))
        self.creation_user_twice()

    def creation_user_twice(self):
        response = self.client.post(CREATE_USER_URL, self.reques_body)
        self.assertEqual(400, response.status_code)

    def test_promition_denied(self):
        self.assertRaises(Exception, self.client.get, path = CREATE_USER_URL)
        #TODO check the status code 403

class AuthenticatedUserApiTests(TestCase):
    def setUp(self) -> None:
        self.userAuth = copy.copy(sample_user)
        del self.userAuth["re_password"]
        self.current_user  = create_user(**self.userAuth)
        self.client = APIClient()
        self.client.force_authenticate(user=self.current_user)
        

    def test_get_current_user(self):
        response = self.client.get(ME_URL)
        self.assertEqual(200, response.status_code)
        
    def test_update_user(self):
        changing_user = copy.copy(sample_user)
        changing_user['city'] = 'isf'
        del changing_user['re_password']
        response = self.client.put(USER_URL.format(self.current_user.id), changing_user)
        self.assertEqual(200, response.status_code)
        self.assertEqual('isf', UsersClass.objects.get(id = self.current_user.id).city)


class PublicArtistApiTests(TestCase):
    
    def setUp(self) -> None:
        self.client = APIClient()
        self.reques_body = sample_artist
        

    def test_valid_artist_creation(self):
        self.userAuth = copy.copy(sample_user)
        del self.userAuth["re_password"]
        u  = create_user(**self.userAuth)
        token = InviteToken.objects.filter(artist = Artist.objects.create(user = u))[0]
        self.reques_body['artist']['inviters']['token'] = token.token
        response = self.client.post(CREATE_ARTIST_URL, self.reques_body, format='json')
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

        body = response.json()
        del body["image"]
        del body['artist']
        user = get_user_model().objects.get(**body)

        self.assertEqual(self.reques_body['address'], user.address)
        self.assertFalse(hasattr(user, 're_password'))

