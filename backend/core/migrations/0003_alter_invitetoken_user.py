# Generated by Django 3.2.12 on 2022-03-22 03:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20220322_0321'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invitetoken',
            name='user',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='invitees', to='core.artist'),
        ),
    ]
