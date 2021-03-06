# Generated by Django 3.2.12 on 2022-03-22 03:21

import core.models
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(null=True, upload_to=core.models.upload_post_image_path),
        ),
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ImageField(null=True, upload_to=core.models.upload_user_image_path),
        ),
        migrations.AlterField(
            model_name='invitetoken',
            name='token',
            field=models.UUIDField(default=uuid.uuid4),
        ),
    ]
