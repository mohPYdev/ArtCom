import cmd
import email
import copy
from lib2to3.pgen2 import token
from urllib import response
from wsgiref.util import request_uri
from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from users import serializers, views

from django.contrib.auth import get_user_model
from core.models import Follow
from core.models import Artist

LOGOUT_API="/auth/token/logout/"
LOGIN_API="/auth/token/login/"
GET_ME_API="/auth/users/"

UsersRepository = get_user_model()

def create_user(**params):
    return UsersRepository.objects.create_user(**params)

sample_user = {
            "email": "user1@example.com",
            "username": "1string",
            "password": "alaki1234",
            "city": "1string",
            "address": "1string",
            "postal_code": "1string",
            "first_name": "1string",
            "last_name": "1string"
        }

request_body = {
  "password": "alaki1234",
  "username": "1string"
}
        
class LoginUserTests(TestCase):
    def setUp(self) -> None:
        self.userAuth = copy.copy(sample_user)
        create_user(**self.userAuth, is_active = True)
        self.client = APIClient()

    def test_login(self):
        response = self.client.post(LOGIN_API, request_body)
        self.assertEqual(200, response.status_code)
        print(response.data)
        #probably 201 is correct
        response = self.client.get(GET_ME_API, HTTP_AUTHORIZATION = 'Token {}'.format(str(response.data['auth_token'])))
        self.assertEqual(200, response.status_code)

    def test_logout(self):
        response = self.client.post(LOGIN_API, request_body)
        token = 'Token {}'.format(str(response.data['auth_token']))
        response = self.client.post(LOGOUT_API, HTTP_AUTHORIZATION = token)
        self.assertEqual(204, response.status_code)
        #probably 201 is correct
        response = self.client.post(LOGOUT_API, HTTP_AUTHORIZATION = token)
        self.assertEqual(401, response.status_code)
        response = self.client.get(GET_ME_API, HTTP_AUTHORIZATION = token)
        self.assertEqual(401, response.status_code)
        