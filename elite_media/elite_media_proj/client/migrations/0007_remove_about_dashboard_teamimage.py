# Generated by Django 5.1.2 on 2024-10-20 21:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("client", "0006_alter_dashboard_work_user"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="about_dashboard",
            name="teamimage",
        ),
    ]
