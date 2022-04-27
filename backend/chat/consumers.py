import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.t = 0
        self.run = False


    async def start(self, event):
        print('start')
        content = {
            'command': 'start',
            'message': 'started the auction'
        }
        await self.send_message(content)
    
    def new_price(self, event):
        print('new_price')
        pass
    
    commands = {
        'start': start,
        'new_price': new_price
    }


    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name


        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        self.run = False
        await self.commands[data['command']](self, data)



    async def send_message(self, message):
        print('send_message')

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        print('chat_message')
        self.t = 0
        self.run = True

        # Send message to WebSocket
        while self.t < 10:
            await self.send(text_data=json.dumps({
                'message': message,
                'time': self.t,
            }))
            await asyncio.sleep(1)
            self.t += 1