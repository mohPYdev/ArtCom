# Generated by Django 3.2.12 on 2022-04-07 07:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_post_like_count'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='like_count',
        ),
    ]
