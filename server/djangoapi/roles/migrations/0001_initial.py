# Generated by Django 3.0.8 on 2020-08-05 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Roles',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role_id', models.CharField(max_length=40)),
                ('role_desc', models.CharField(max_length=400)),
                ('lob_id', models.CharField(max_length=40)),
                ('wfgroup_id', models.CharField(max_length=40)),
            ],
        ),
    ]
