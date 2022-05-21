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



UsersClass = get_user_model()

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
            "last_name": "string",
            "re_password": "alaki1234"
        }