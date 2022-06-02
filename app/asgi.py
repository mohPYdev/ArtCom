"""
ASGI config for app project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")
django_asgi_app = get_asgi_application()

from chat.middleware import TokenAuthMiddleware
import chat.routing

application = ProtocolTypeRouter({
  "http": django_asgi_app,
  "websocket": TokenAuthMiddleware(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})