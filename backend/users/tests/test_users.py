from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse('users:user-list')

class PublicUserApiTests(TestCase):

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
        print(response.json)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

