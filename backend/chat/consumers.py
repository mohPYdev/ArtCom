import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async


from django.contrib.auth import get_user_model
from core import models

User = get_user_model()


task = None
p_command = ''

class ChatConsumer(AsyncWebsocketConsumer):

    t = 0
    

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.run = False

    async def pause(self, event):
        await self.send_message({
            'command':'pause',
            'username':event['username'],
            'post_id':event['post_id'],
            'price':event['price'],
            'n_post':event['n_post'],
        })


    async def start(self, event):
        global t
        content = {
            'price':event['price'],
            'command':'start',
            'n_post':event['n_post'],
            'post_id':event['post_id'],
            'username':event['username'],
        }
        # await self.send(text_data=json.dumps(content))
        while t <= 11:
            await self.send_message(content)
            await asyncio.sleep(1)
            t += 1
            if t == 11:
                if event['username'] != 'admin':
                    await self.payment(content['username'], content['post_id'], content['price'])
                await asyncio.sleep(5)
            

    
    async def new_price(self, event):
        message = {
            'price':event['price'],
            'command':'new_price',
            'n_post':event['n_post'],
            'post_id':event['post_id'],
            'username':event['username'],
        }
        print('new price')
        await self.send_message(message)
        
    
    commands = {
        'start': start,
        'new_price': new_price,
        'pause': pause,
    }


    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        print(self.scope['user'])
        


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
        global task
        global t
        global p_command
        data = json.loads(text_data)

        if data['command'] != 'pause' and p_command != 'pause':
            t = 0


        if task:
            task.cancel()
            print('cancled')


        p_command = data['command']
        task = asyncio.create_task(self.commands[data['command']](self, data))



    async def send_message(self, message):

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

        print(message)
        
        await self.send(text_data=json.dumps({
            'price': message['price'],
            'command': message['command'],
            'post_id': message['post_id'],
            'time': t,
            'username': message['username'],
        }))

    @database_sync_to_async
    def payment(self, username, post_id, price):
        """ adds the highest bidder to the order table """
        print('helloooooooo whats uppp')
        user = User.objects.get(username=username)
        post = models.Post.objects.get(id=post_id)
        post.price = price
        post.save()
        order = models.Order.objects.get_or_create(user=user, post=post)
        
        