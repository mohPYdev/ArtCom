# Generated by Django 3.2.12 on 2022-04-07 09:05

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_remove_post_like_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='exhibition',
            name='date_begin',
            field=models.DateTimeField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='exhibition',
            name='date_end',
            field=models.DateTimeField(default=datetime.date.today),
        ),
    ]
