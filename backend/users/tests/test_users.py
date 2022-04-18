import email
from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from users import serializers, views

from django.contrib.auth import get_user_model
CREATE_USER_URL = reverse('users:user-list')

class PublicUserApiTests(TestCase):
    client = None

    def setUp(self) -> None:
        self.client = APIClient()

    def test_valid_user_creation(self):
        reques_body =   {
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

        response = self.client.post(CREATE_USER_URL, reques_body)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        x = response.json()
        del x["image"]
        user = get_user_model().objects.get(**x)

        self.assertEqual(reques_body['address'], user.address)
        self.assertFalse(hasattr(user, 're_password'))