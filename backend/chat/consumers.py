import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer

task = None
p_command = ''

class ChatConsumer(AsyncWebsocketConsumer):

    t = 0
    

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.run = False

    async def pause(self, event):
        print('pausing')


    async def start(self, event):
        global t
        content = {
            'price':event['price'],
            'command':'start',
            'post_id':event['post_id'],
            'username':event['username'],
        }
        await self.send(text_data=json.dumps(content))
        while t <= 10:
            await self.send_message(content)
            await asyncio.sleep(1)
            t += 1

    
    async def new_price(self, event):
        message = {
            'price':event['price'],
            'command':'new_price',
            'post_id':event['post_id'],
            'username':event['username'],
        }
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
        