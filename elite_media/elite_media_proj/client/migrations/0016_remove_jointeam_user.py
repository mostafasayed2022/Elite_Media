# Generated by Django 5.1.2 on 2024-11-14 19:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("client", "0015_delete_frontendcontrol_alter_jointeam_user"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="jointeam",
            name="user",
        ),
    ]