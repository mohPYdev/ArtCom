
# from channels.security.websocket import AllowedHostsOriginValidator
# from channels.routing import ProtocolTypeRouter, URLRouter
# from .middleware import TokenAuthMiddleware
# from .consumers import ChatConsumer
# from django.conf.urls import url

# application = ProtocolTypeRouter({
#         'websocket': AllowedHostsOriginValidator(
#             TokenAuthMiddleware(
#                 URLRouter(
#                     [
#                         url(r"ws/chat/(?P<room_name>\w+)/$", ChatConsumer.as_asgi()),
#                     ]
#                 )
#             )
#         )
#     })

from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
]