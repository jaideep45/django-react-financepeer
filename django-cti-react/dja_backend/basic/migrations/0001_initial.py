# Generated by Django 4.1.3 on 2022-11-10 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DataPoints',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('userId', models.IntegerField()),
                ('title', models.CharField(max_length=500)),
                ('body', models.CharField(max_length=500)),
            ],
        ),
    ]
