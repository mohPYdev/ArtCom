# Generated by Django 3.2.12 on 2022-05-16 04:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_exhibition_cover'),
    ]

    operations = [
        migrations.AddField(
            model_name='exhibition',
            name='title',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
