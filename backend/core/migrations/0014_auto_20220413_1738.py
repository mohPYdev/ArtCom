# Generated by Django 3.2.12 on 2022-04-13 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0013_auto_20220409_2338'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='shipped',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='auction',
            name='artist',
            field=models.ManyToManyField(blank=True, to='core.Artist'),
        ),
        migrations.AlterField(
            model_name='auction',
            name='post',
            field=models.ManyToManyField(blank=True, to='core.Post'),
        ),
        migrations.DeleteModel(
            name='Shipping',
        ),
    ]
