# Generated by Django 4.2.6 on 2023-12-12 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('message_id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=15)),
                ('message', models.CharField(max_length=100)),
            ],
        ),
    ]
