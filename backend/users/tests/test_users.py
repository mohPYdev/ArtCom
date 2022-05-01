import cmd
import email
from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from users import serializers, views

from django.contrib.auth import get_user_model

CREATE_USER_URL = reverse('users:user-list')

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
# class PublicUserApiTests(TestCase):
    
#     def setUp(self) -> None:
#         self.client = APIClient()
#         self.reques_body = sample_user

#     def test_valid_user_creation(self):
#         response = self.client.post(CREATE_USER_URL, self.reques_body)
#         self.assertEqual(status.HTTP_201_CREATED, response.status_code)

#         body = response.json()
#         del body["image"]
#         user = get_user_model().objects.get(**body)

#         self.assertEqual(self.reques_body['address'], user.address)
#         self.assertFalse(hasattr(user, 're_password'))
#         self.creation_user_twice()

#     def creation_user_twice(self):
#         response = self.client.post(CREATE_USER_URL, self.reques_body)
#         self.assertEqual(400, response.status_code)

#     def test_promition_denied(self):
#         self.assertRaises(Exception, self.client.get, path = CREATE_USER_URL)
#         #TODO check the status code 403

class AuthenticatedUserApiTests(TestCase):
    def setUp(self) -> None:
        self.user = sample_user
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_get_current_user(self):
        response = self.client.get(CREATE_USER_URL)
        self.assertEqual(200, response.status_code)
        print(response.data)
